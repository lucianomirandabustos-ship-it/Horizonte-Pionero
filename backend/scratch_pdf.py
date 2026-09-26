import sys

try:
    import pypdf
    reader = pypdf.PdfReader("backend/static/especialidades-scouts.pdf")
    print(f"pypdf OK, pages: {len(reader.pages)}")
    text = ""
    for i in range(min(10, len(reader.pages))):
        text += f"--- PAGE {i+1} ---\n" + reader.pages[i].extract_text() + "\n"
    with open("scratch_toc.txt", "w", encoding="utf-8") as f:
        f.write(text)
    print("Extracted first 10 pages to scratch_toc.txt")
except Exception as e:
    print(f"Error: {e}")
