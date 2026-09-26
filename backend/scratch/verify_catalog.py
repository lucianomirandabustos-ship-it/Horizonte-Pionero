import re

with open("frontend/src/data/specialtiesData.ts", "r", encoding="utf-8") as f:
    text = f.read()

# Match areas
area_matches = re.findall(r'\"id\":\s*\"(area-[^\"]+)\"', text)
print(f"Total Areas found: {len(area_matches)} -> {area_matches}")

# Match specialties
specialty_matches = re.findall(r'\"name\":\s*\"([^\"]+)\",\s*\"page\":\s*(\d+)', text)
unique_specialties = []
for name, page in specialty_matches:
    if name not in [s[0] for s in unique_specialties]:
        unique_specialties.append((name, page))

print(f"\nTotal Unique Specialties: {len(unique_specialties)}")
for i, (name, page) in enumerate(unique_specialties, 1):
    print(f" {i:2d}. {name} (Pág. {page})")
