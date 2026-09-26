import re

path = "frontend/src/data/specialtiesData.ts"
with open(path, "r", encoding="utf-8") as f:
    text = f.read()

# Pattern for leaked PDF page headers/sidebars
pattern = r"\s*\d{2,4}\s+[ÁA]REA\s+(?:DE\s+LA\s+|DEL\s+)?[^\"]*"
text = re.sub(pattern, "", text)

# Pattern for trailing 111, 222, 333, 444, 555, 666
text = re.sub(r"\s+[1-6]{3}(?=\"|\s)", "", text)

with open(path, "w", encoding="utf-8") as f:
    f.write(text)

print("Specialties data cleaned successfully.")
