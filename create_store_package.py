#!/usr/bin/env python3
"""
Chrome Web Store Package Creator
Creates a .zip file ready for Chrome Web Store submission
"""

import os
import zipfile
import argparse
from pathlib import Path

def create_store_package(project_dir, output_file='insta-download.zip'):
    """Create a .zip file for Chrome Web Store submission"""
    
    # Files to include
    INCLUDE_FILES = [
        'manifest.json',
        'popup.html',
        'popup.js',
        'popup.css',
        'contentScript.js',
        'background.js',
        'icons/icon16.png',
        'icons/icon48.png',
        'icons/icon128.png',
        'icons/logo.png',
    ]
    
    # Files to exclude
    EXCLUDE_PATTERNS = [
        '.git',
        '.github',
        'node_modules',
        '.gitignore',
        '*.zip',
        'generate_icons.py',
        'generate-icons.js',
    ]
    
    print(f"📦 Creating Chrome Web Store package...")
    print(f"📂 Project directory: {project_dir}")
    
    project_path = Path(project_dir)
    if not project_path.exists():
        print(f"❌ Error: Project directory not found: {project_dir}")
        return False
    
    try:
        with zipfile.ZipFile(output_file, 'w', zipfile.ZIP_DEFLATED) as zipf:
            files_added = 0
            
            for file_pattern in INCLUDE_FILES:
                file_path = project_path / file_pattern
                
                if file_path.exists():
                    # Add file to zip with relative path
                    arcname = str(file_path.relative_to(project_path))
                    zipf.write(file_path, arcname=arcname)
                    print(f"  ✅ Added: {arcname}")
                    files_added += 1
                else:
                    print(f"  ⚠️  Skipped: {file_pattern} (not found)")
        
        file_size = os.path.getsize(output_file)
        print(f"\n✅ Package created successfully!")
        print(f"📄 File: {output_file}")
        print(f"📊 Size: {file_size / 1024:.1f} KB")
        print(f"📝 Files included: {files_added}")
        
        print("\n📋 Next steps:")
        print("1. Go to https://chrome.google.com/webstore/devconsole")
        print("2. Click 'New Item'")
        print("3. Upload this .zip file")
        print("4. Fill in store listing details")
        print("5. Submit for review")
        
        return True
        
    except Exception as e:
        print(f"❌ Error creating package: {e}")
        return False

def main():
    parser = argparse.ArgumentParser(description='Create Chrome Web Store submission package')
    parser.add_argument('project_dir', nargs='?', default='.', 
                       help='Project directory (default: current directory)')
    parser.add_argument('-o', '--output', default='insta-download.zip',
                       help='Output zip file (default: insta-download.zip)')
    
    args = parser.parse_args()
    
    success = create_store_package(args.project_dir, args.output)
    exit(0 if success else 1)

if __name__ == '__main__':
    main()
