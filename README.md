# Image to PDF Converter

A Node.js utility that converts JPG images to PDFs and merges them into a single output file.

## Features

- Converts multiple JPG images to individual PDF files
- Automatically merges all generated PDFs into a single output file
- Preserves original image dimensions in PDF conversion
- Simple command-line interface

## Prerequisites

- Node.js (version 12 or higher)
- npm (Node Package Manager)

## Installation

1. Clone this repository
2. Install dependencies:
```bash
npm install
```

## Usage

Run the script with a directory path containing your JPG images:

```bash
node index.js /path/to/image/directory
```

The script will:
1. Convert all JPG files in the specified directory to individual PDFs
2. Merge all generated PDFs into a single file named `output.pdf`
3. Save the final PDF in the same directory as the input images

## Example

If you have a directory `/photos` containing images:
- vacation1.jpg
- vacation2.jpg
- vacation3.jpg

Running:
```bash
node index.js /photos
```

Will generate:
- vacation1.pdf
- vacation2.pdf
- vacation3.pdf
- output.pdf (containing all images)

## Dependencies

- pdf-lib: PDF creation and manipulation
- fs: File system operations
- path: Path manipulation

## License

MIT
