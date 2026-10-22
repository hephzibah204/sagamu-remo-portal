import os
from PIL import Image, ImageDraw, ImageFont

os.makedirs('mobile/assets', exist_ok=True)

def create_badge(filename, size, bg_color, border_color, symbol, title, subtitle):
    img = Image.new('RGBA', (size, size), bg_color)
    draw = ImageDraw.Draw(img)
    
    # Outer decorative ring
    margin = int(size * 0.05)
    draw.rounded_rectangle([margin, margin, size - margin, size - margin], radius=int(size * 0.15), outline=border_color, width=int(size * 0.02))
    
    # Inner gold border
    inner_m = int(size * 0.09)
    draw.rounded_rectangle([inner_m, inner_m, size - inner_m, size - inner_m], radius=int(size * 0.12), outline=(201, 150, 58, 120), width=int(size * 0.01))
    
    img.save(filename, 'PNG')
    print(f"Created {filename} ({size}x{size})")

# 1. Citizen App Icon (Royal Sovereign Indigo #1E3A8A & Crown Gold)
create_badge('mobile/assets/icon.png', 1024, (30, 58, 138, 255), (201, 150, 58, 255), '👑', 'SAGAMU REMO', 'CIVIC PORTAL')
create_badge('mobile/assets/adaptive-icon.png', 1024, (30, 58, 138, 255), (201, 150, 58, 255), '👑', 'SAGAMU REMO', 'CIVIC PORTAL')
create_badge('mobile/assets/splash.png', 2048, (30, 58, 138, 255), (201, 150, 58, 255), '👑', 'SAGAMU REMO', 'CIVIC PORTAL')
create_badge('mobile/assets/favicon.png', 48, (30, 58, 138, 255), (201, 150, 58, 255), '👑', '', '')

# 2. Officer App Icon (Dark Crimson / Gold / Shield)
create_badge('mobile/assets/officer-icon.png', 1024, (20, 10, 8, 255), (239, 68, 68, 255), '🛡️', 'FIELD COMMAND', 'SAGAMU REMO')
create_badge('mobile/assets/officer-adaptive-icon.png', 1024, (20, 10, 8, 255), (239, 68, 68, 255), '🛡️', 'FIELD COMMAND', 'SAGAMU REMO')

print("All mobile assets generated successfully!")
