import fs from 'fs';
import path from 'path';

function walkDir(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walkDir(file));
        } else { 
            if (file.endsWith('.tsx') || file.endsWith('.ts')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walkDir(path.join(process.cwd(), 'src'));

let modifiedCount = 0;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let newContent = content
        // Colors
        .replace(/bg-\[\#0ABAB5\]/g, 'bg-tiffany')
        .replace(/text-\[\#0ABAB5\]/g, 'text-tiffany')
        .replace(/border-\[\#0ABAB5\]/g, 'border-tiffany')
        .replace(/ring-\[\#0ABAB5\]/g, 'ring-tiffany')
        .replace(/from-\[\#0ABAB5\]/g, 'from-tiffany')
        .replace(/to-\[\#0ABAB5\]/g, 'to-tiffany')
        .replace(/via-\[\#0ABAB5\]/g, 'via-tiffany')
        .replace(/bg-\[\#FFED99\]/g, 'bg-macaron')
        .replace(/text-\[\#FFED99\]/g, 'text-macaron')
        .replace(/border-\[\#FFED99\]/g, 'border-macaron')
        .replace(/ring-\[\#FFED99\]/g, 'ring-macaron')
        .replace(/from-\[\#FFED99\]/g, 'from-macaron')
        .replace(/to-\[\#FFED99\]/g, 'to-macaron')
        .replace(/via-\[\#FFED99\]/g, 'via-macaron')
        .replace(/bg-\[\#088F8F\]/g, 'bg-tiffany-dark')
        .replace(/text-\[\#088F8F\]/g, 'text-tiffany-dark')
        .replace(/border-\[\#088F8F\]/g, 'border-tiffany-dark')
        .replace(/bg-\[\#B2EBF2\]/g, 'bg-tiffany-light')
        .replace(/text-\[\#B2EBF2\]/g, 'text-tiffany-light')
        .replace(/border-\[\#B2EBF2\]/g, 'border-tiffany-light')
        // Inline font families
        .replace(/\s*style=\{\{\s*fontFamily:\s*["'][^"']+["']\s*\}?\}?\S*?\s*/g, ' ')
        // inline fonts combined with other styles (approximate, careful)
        .replace(/fontFamily:\s*["'][^"']+["']\s*,?\s*/g, '')
        // Clean up empty style tags 
        .replace(/style=\{\{\s*\}\}/g, '')
        .replace(/style=\{fontStyle\}/g, '');

    if (content !== newContent) {
        fs.writeFileSync(file, newContent, 'utf8');
        modifiedCount++;
    }
});

console.log(`Modified ${modifiedCount} files.`);
