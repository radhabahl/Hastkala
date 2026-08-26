import AppKit
import Foundation
import PDFKit

guard CommandLine.arguments.count == 3 else {
    fputs("Usage: render-pdf.swift input.pdf output-directory\n", stderr)
    exit(1)
}

let inputURL = URL(fileURLWithPath: CommandLine.arguments[1])
let outputURL = URL(fileURLWithPath: CommandLine.arguments[2], isDirectory: true)

guard let document = PDFDocument(url: inputURL) else {
    fputs("Unable to open PDF.\n", stderr)
    exit(1)
}

try FileManager.default.createDirectory(at: outputURL, withIntermediateDirectories: true)

for index in 0..<document.pageCount {
    guard let page = document.page(at: index) else { continue }
    let bounds = page.bounds(for: .mediaBox)
    let width: CGFloat = 1400
    let height = width * bounds.height / bounds.width
    let image = page.thumbnail(of: NSSize(width: width, height: height), for: .mediaBox)

    guard
        let data = image.tiffRepresentation,
        let bitmap = NSBitmapImageRep(data: data),
        let png = bitmap.representation(using: .png, properties: [:])
    else { continue }

    let filename = String(format: "page-%02d.png", index + 1)
    try png.write(to: outputURL.appendingPathComponent(filename))
}

print("Rendered \(document.pageCount) pages to \(outputURL.path)")
