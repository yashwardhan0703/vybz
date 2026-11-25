import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

def create_refined_option1():
    logo_path = 'public/logo.png'
    if not os.path.exists(logo_path):
        print("logo.png not found")
        return

    orig_logo = Image.open(logo_path).convert('RGBA')
    width, height = 1200, 630

    font_paths = [
        "C:/Windows/Fonts/segoeuib.ttf",
        "C:/Windows/Fonts/arialbd.ttf",
        "C:/Windows/Fonts/arial.ttf"
    ]
    font_title = None
    for p in font_paths:
        if os.path.exists(p):
            try:
                font_title = ImageFont.truetype(p, 64)
                font_sub = ImageFont.truetype(p, 28)
                font_tag = ImageFont.truetype(p, 22)
                font_badge = ImageFont.truetype(p, 19)
                font_pill = ImageFont.truetype(p, 20)
                font_footer = ImageFont.truetype(p, 24)
                break
            except Exception:
                continue

    if not font_title:
        font_title = ImageFont.load_default()
        font_sub = ImageFont.load_default()
        font_tag = ImageFont.load_default()
        font_badge = ImageFont.load_default()
        font_pill = ImageFont.load_default()
        font_footer = ImageFont.load_default()

    def make_canvas():
        card = Image.new('RGBA', (width, height), (8, 11, 18, 255))
        # Warm ambient glows
        glow = Image.new('RGBA', (width, height), (0, 0, 0, 0))
        g_draw = ImageDraw.Draw(glow)
        g_draw.ellipse([60, 40, 680, 600], fill=(245, 158, 11, 45))
        g_draw.ellipse([700, 80, 1200, 580], fill=(225, 29, 72, 25))
        glow = glow.filter(ImageFilter.GaussianBlur(85))
        card = Image.alpha_composite(card, glow)

        # Place Logo on Left
        logo_size = 420
        scaled_logo = orig_logo.resize((logo_size, logo_size), Image.Resampling.LANCZOS)
        card.paste(scaled_logo, (80, int((height - logo_size) / 2)), scaled_logo)
        return card

    art_dir = "C:/Users/HP/.gemini/antigravity/brain/c6d727f8-5689-4512-99b6-9df1fa4c7d3d"
    os.makedirs(art_dir, exist_ok=True)
    rx = 540

    # =========================================================================
    # REFINED OPTION 1 (Variant A: Dark High-Contrast Badge with Pure White Text)
    # =========================================================================
    card1 = make_canvas()
    draw1 = ImageDraw.Draw(card1)

    # 1. Top Badge - High Contrast: Dark pill with amber border & bright white text
    badge_text = "✦   OFFICIAL INDIAN MUSIC PLATFORM   ✦"
    b_box = draw1.textbbox((0, 0), badge_text, font=font_badge)
    bw = b_box[2] - b_box[0] + 36
    bh = 38
    by = 95
    # Dark charcoal fill + sharp gold border
    draw1.rounded_rectangle([rx, by, rx + bw, by + bh], radius=19, fill=(20, 26, 38, 255), outline=(245, 158, 11, 220), width=2)
    # Perfectly centered text
    bx_text = rx + (bw - (b_box[2] - b_box[0])) / 2
    by_text = by + (bh - (b_box[3] - b_box[1])) / 2 - 2
    draw1.text((bx_text, by_text), badge_text, font=font_badge, fill=(255, 255, 255))

    # 2. Main Title
    draw1.text((rx, 155), "VybZ Music", font=font_title, fill=(255, 255, 255))

    # 3. Subtitles
    draw1.text((rx, 245), "100% Ad-Free Indian Music Streaming", font=font_sub, fill=(245, 158, 11))
    draw1.text((rx, 295), "Chai Tapri, Sufi, Dhaba & 10 Ambient Stations", font=font_tag, fill=(185, 200, 220))

    # 4. Feature Pills - Perfectly Centered and Aligned
    features = ["Zero Audio Ads", "Background Audio", "Daily Top 25"]
    fx = rx
    fy = 355
    pill_h = 44
    for feat in features:
        fbox = draw1.textbbox((0, 0), feat, font=font_pill)
        fw = fbox[2] - fbox[0] + 34
        # Sleek dark background with gold accent outline
        draw1.rounded_rectangle([fx, fy, fx + fw, fy + pill_h], radius=22, fill=(18, 24, 38, 255), outline=(245, 158, 11, 140), width=1)
        # Perfectly centered text in pill
        tx = fx + (fw - (fbox[2] - fbox[0])) / 2
        ty = fy + (pill_h - (fbox[3] - fbox[1])) / 2 - 2
        draw1.text((tx, ty), feat, font=font_pill, fill=(253, 224, 71))
        fx += fw + 16

    # 5. Divider Line
    draw1.line([rx, 445, rx + 580, 445], fill=(255, 255, 255, 40), width=1)

    # 6. Footer Text
    footer_text = "vybzmusic.online   •   Android APK Available"
    draw1.text((rx, 475), footer_text, font=font_footer, fill=(252, 211, 77))

    p1 = os.path.join(art_dir, "option1_dark_pills.jpg")
    card1.convert('RGB').save(p1, quality=92)
    print("Saved Refined Option 1 to", p1)

    # =========================================================================
    # OPTION 1B (Variant B: Solid Gold Sticker Badge - Maximum Pop)
    # =========================================================================
    card1b = make_canvas()
    draw1b = ImageDraw.Draw(card1b)

    # Solid Amber/Gold Badge with Dark Black Bold Text (Like a luxury verified badge)
    draw1b.rounded_rectangle([rx, by, rx + bw, by + bh], radius=19, fill=(245, 158, 11, 255), outline=(253, 224, 71, 255), width=1)
    draw1b.text((bx_text, by_text), badge_text, font=font_badge, fill=(10, 14, 22))

    # Main Title
    draw1b.text((rx, 155), "VybZ Music", font=font_title, fill=(255, 255, 255))

    # Subtitles
    draw1b.text((rx, 245), "100% Ad-Free Indian Music Streaming", font=font_sub, fill=(245, 158, 11))
    draw1b.text((rx, 295), "Chai Tapri, Sufi, Dhaba & 10 Ambient Stations", font=font_tag, fill=(185, 200, 220))

    # Feature Pills
    fx = rx
    for feat in features:
        fbox = draw1b.textbbox((0, 0), feat, font=font_pill)
        fw = fbox[2] - fbox[0] + 34
        draw1b.rounded_rectangle([fx, fy, fx + fw, fy + pill_h], radius=22, fill=(18, 24, 38, 255), outline=(245, 158, 11, 140), width=1)
        tx = fx + (fw - (fbox[2] - fbox[0])) / 2
        ty = fy + (pill_h - (fbox[3] - fbox[1])) / 2 - 2
        draw1b.text((tx, ty), feat, font=font_pill, fill=(253, 224, 71))
        fx += fw + 16

    # Divider Line
    draw1b.line([rx, 445, rx + 580, 445], fill=(255, 255, 255, 40), width=1)

    # Footer Text
    draw1b.text((rx, 475), footer_text, font=font_footer, fill=(252, 211, 77))

    p1b = os.path.join(art_dir, "option1b_gold_badge.jpg")
    card1b.convert('RGB').save(p1b, quality=92)
    print("Saved Option 1B to", p1b)

if __name__ == '__main__':
    create_refined_option1()
