import re
import datetime
from pathlib import Path
from xml.etree import ElementTree as ET
from xml.dom import minidom

def read_posts_from_js(filepath):
    """Extract post names from source.js"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find all post names using regex
    pattern = r'"name":\s*"([^"]+)"'
    pattern = r'name:\s*"([^"]+)"'
    return re.findall(pattern, content)

def create_slug(name):
    """Convert post name to URL slug"""
    # Convert to lowercase and replace spaces with hyphens
    slug = name.lower().replace(' ', '-')
    return slug

def get_existing_urls(sitemap_path):
    """Get list of existing URLs from sitemap"""
    tree = ET.parse(sitemap_path)
    root = tree.getroot()
    # Remove namespace for easier parsing
    for elem in root.iter():
        if '}' in elem.tag:
            elem.tag = elem.tag.split('}', 1)[1]
    return [url.find('loc').text for url in root.findall('url')]

def add_new_urls(sitemap_path, new_slugs):
    """Add new URLs to sitemap while preserving existing ones"""
    # Parse existing sitemap
    tree = ET.parse(sitemap_path)
    root = tree.getroot()
    
    # Remove namespace for easier manipulation
    for elem in root.iter():
        if '}' in elem.tag:
            elem.tag = elem.tag.split('}', 1)[1]
    
    # Get existing URLs
    existing_urls = get_existing_urls(sitemap_path)
    
    # Current date for new entries
    today = datetime.date.today().strftime('%Y-%m-%d')
    
    # Add new URLs
    for slug in new_slugs:
        url = f"https://cyde.xyz/{slug}"
        if url not in existing_urls:
            url_elem = ET.SubElement(root, 'url')
            
            loc = ET.SubElement(url_elem, 'loc')
            loc.text = url
            
            lastmod = ET.SubElement(url_elem, 'lastmod')
            lastmod.text = today
            
            changefreq = ET.SubElement(url_elem, 'changefreq')
            changefreq.text = 'monthly'
            
            priority = ET.SubElement(url_elem, 'priority')
            priority.text = '0.7'
    
    # Format and save the XML with clean whitespace
    xml_str = minidom.parseString(ET.tostring(root)).toprettyxml(indent="  ")
    
    # Clean up extra whitespace
    clean_lines = [line for line in xml_str.splitlines() if line.strip()]
    xml_str = '\n'.join(clean_lines)
    
    # Add XML declaration
    xml_str = '<?xml version=\'1.0\' encoding=\'utf-8\'?>\n' + xml_str.split('?>', 1)[1].lstrip()
    
    with open(sitemap_path, 'w', encoding='utf-8') as f:
        f.write(xml_str)

def main():
    source_path = r"C:\Users\adham\Documents\GitHub\cydexyz\src\utils\source.js"
    sitemap_path = r"C:\Users\adham\Documents\GitHub\cydexyz\public\sitemap.xml"
    
    # Get post names from source.js
    post_names = read_posts_from_js(source_path)
    
    # Convert names to slugs
    slugs = [create_slug(name) for name in post_names]
    
    # Update sitemap with new URLs
    add_new_urls(sitemap_path, slugs)
    
    print("Sitemap updated successfully!")

if __name__ == "__main__":
    main()
