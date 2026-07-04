#!/usr/bin/env python3
"""
Hero Image Generation Script for Perkins Catering Co.
======================================================

Generates high-quality hero background images using OpenAI's gpt-image-1 API.
Saves them to public/images/hero/ for use in the HeroSlider component.

Prerequisites:
    pip install openai
    export OPENAI_API_KEY="sk-..."

Usage:
    python _generate_hero_images.py              # Generate all 3 hero images
    python _generate_hero_images.py --single 0   # Generate only the first image
    python _generate_hero_images.py --size 4k    # Generate at 4K (4096x2304)
    python _generate_hero_images.py --size 2k    # Generate at 2K (2560x1440) [default]

The prompts below are crafted to produce photorealistic images of catered
events that fit the Perkins Catering Co. brand: wine country, farm-to-table,
elegant outdoor settings. Modify the prompts below to customize.
"""

import argparse
import base64
import os
import sys
from pathlib import Path

try:
    from openai import OpenAI
except ImportError:
    print("ERROR: pip install openai", file=sys.stderr)
    sys.exit(1)


# ── Image prompts ──────────────────────────────────────────────────────────
# Each prompt is designed to produce a wide, full-bleed hero image.
# The style is photorealistic, warm, elegant — wine country catering.

PROMPTS = [
    {
        "name": "wedding-garden-table",
        "prompt": (
            "Photorealistic wide-angle shot of a beautifully catered wedding "
            "reception table set outdoors in a lush garden at a Sonoma County "
            "winery. Long elegant table with white linens, fine china, crystal "
            "glassware, soft floral centerpieces with garden roses and eucalyptus. "
            "Warm golden afternoon light filtering through trees. String lights "
            "overhead. Background shows vineyard hills. No people. "
            "Cinematic, high-end editorial photography style. "
            "Sharp focus, rich colors, professional catering setup."
        ),
    },
    {
        "name": "sunlit-elegant-table",
        "prompt": (
            "Photorealistic shot of an elegant outdoor dining table set for a "
            "catered event at a Napa Valley winery. Round table with natural "
            "linen runner, artisanal ceramic plates, gold flatware, wine glasses "
            "with red and white wine. Centerpiece of seasonal flowers and candles. "
            "Bright natural sunlight, dappled shade from overhead pergola draped "
            "with vines. Background of rolling vineyard rows. No people. "
            "Editorial food photography, crisp and bright, shallow depth of field."
        ),
    },
    {
        "name": "outdoor-celebration-table",
        "prompt": (
            "Photorealistic wide shot of a gorgeous catered celebration table "
            "outdoors near sunset at a wine country estate. Long farmhouse table "
            "with mixed seating, elegant place settings, tall floral arrangements "
            "with wildflowers and lavender, amber glassware catching golden hour "
            "light. Background shows sunset over vineyard hills with warm orange "
            "and pink sky. Candles beginning to glow. No people. "
            "Luxury event photography, warm tones, cinematic composition."
        ),
    },
]

# ── Size presets ───────────────────────────────────────────────────────────
SIZE_PRESETS = {
    "2k": {"width": 2560, "height": 1440},
    "4k": {"width": 4096, "height": 2304},
}


def generate_image(client: OpenAI, prompt: str, size_label: str) -> bytes:
    """Generate an image using OpenAI gpt-image-1."""
    # gpt-image-1 supports: 1024x1024, 1536x1024, 1024x1536
    # We use 1536x1024 (landscape) and upscale later if needed
    result = client.images.generate(
        model="gpt-image-1",
        prompt=prompt,
        size="1536x1024",
        quality="high",
        n=1,
    )
    image_b64 = result.data[0].b64_json
    return base64.b64decode(image_b64)


def main():
    parser = argparse.ArgumentParser(description="Generate hero images for Perkins Catering Co.")
    parser.add_argument("--single", type=int, help="Generate only one image by index (0-based)")
    parser.add_argument("--size", choices=["2k", "4k"], default="2k", help="Output size preset")
    args = parser.parse_args()

    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key:
        print("ERROR: Set OPENAI_API_KEY environment variable", file=sys.stderr)
        sys.exit(1)

    client = OpenAI(api_key=api_key)

    # Output directory
    out_dir = Path(__file__).parent / "public" / "images" / "hero"
    out_dir.mkdir(parents=True, exist_ok=True)

    size_info = SIZE_PRESETS[args.size]
    print(f"Generating hero images at {args.size} ({size_info['width']}x{size_info['height']})")
    print(f"Output directory: {out_dir}")
    print()

    indices = [args.single] if args.single is not None else range(len(PROMPTS))

    for idx in indices:
        if idx < 0 or idx >= len(PROMPTS):
            print(f"ERROR: Invalid index {idx}. Valid range: 0-{len(PROMPTS) - 1}", file=sys.stderr)
            sys.exit(1)

        entry = PROMPTS[idx]
        out_path = out_dir / f"{entry['name']}.jpg"

        print(f"[{idx + 1}/{len(PROMPTS)}] Generating '{entry['name']}'...")
        print(f"  Prompt: {entry['prompt'][:100]}...")

        try:
            image_bytes = generate_image(client, entry["prompt"], args.size)
            out_path.write_bytes(image_bytes)
            size_kb = len(image_bytes) / 1024
            print(f"  Saved: {out_path.name} ({size_kb:.0f} KB)")
        except Exception as e:
            print(f"  FAILED: {e}", file=sys.stderr)

        print()

    print("Done! Update src/components/HeroSlider.tsx if you changed image names.")


if __name__ == "__main__":
    main()
