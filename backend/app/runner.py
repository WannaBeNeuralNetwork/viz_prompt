import subprocess
import uuid
import os

STATIC_DIR = "app/static"
os.makedirs(STATIC_DIR, exist_ok=True)

def run_script(language: str, code: str) -> dict:
    filename = f"vis_{uuid.uuid4().hex[:8]}"
    base_path = os.path.join(STATIC_DIR, filename)

    try:
        
        # PYTHON
     
        if language == "python":
            if "plotly" in code:
                html_path = base_path + ".html"
                code += f"\nfig.write_html('{html_path}')"
                script_path = base_path + ".py"
                with open(script_path, "w") as f:
                    f.write(code)
                subprocess.run(["python3", script_path], check=True, timeout=15)
                return {"status": "success", "filename": os.path.basename(html_path), "type": "html"}

            else:
                png_path = base_path + ".png"
                code = code.replace("plt.show()", f"plt.savefig('{png_path}')")
                script_path = base_path + ".py"
                with open(script_path, "w") as f:
                    f.write(code)
                subprocess.run(["python3", script_path], check=True, timeout=15)
                return {"status": "success", "filename": os.path.basename(png_path), "type": "image"}


        # R
      
        elif language == "r":
            html_path = base_path + ".html"
            script_path = base_path + ".R"

            if "plotly" in code:
                # Wrap user's code into a widget assignment and save it
                code = f"""
                library(plotly)
                library(htmlwidgets)
                widget <- ({code.strip()})
                saveWidget(widget, "{html_path}", selfcontained = TRUE)
                """

            elif "rgl" in code:
                # Allow direct plot3d usage; append rglwidget and save
                code = f"""
                library(rgl)
                library(htmlwidgets)
                {code.strip()}
                saveWidget(rglwidget(), "{html_path}", selfcontained = TRUE)
                """

            else:
                # Static R plot to PNG
                png_path = base_path + ".png"
                code = f"png('{png_path}')\n" + code + "\ndev.off()"
                with open(script_path, "w") as f:
                    f.write(code)
                subprocess.run(["Rscript", script_path], check=True, timeout=15)
                return {"status": "success", "filename": os.path.basename(png_path), "type": "image"}

            # Write and run the interactive R script (plotly or rgl)
            with open(script_path, "w") as f:
                f.write(code)
            subprocess.run(["Rscript", script_path], check=True, timeout=15)
            return {"status": "success", "filename": os.path.basename(html_path), "type": "html"}

        # error msg for Unsupported language
        return {"status": "error", "error": "Unsupported language"}

    except subprocess.CalledProcessError as e:
        return {"status": "error", "error": f"Script error: {str(e)}"}
    except Exception as e:
        return {"status": "error", "error": f"Execution failed: {str(e)}"}
