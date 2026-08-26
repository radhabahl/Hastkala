import CoreGraphics
import Foundation

guard CommandLine.arguments.count == 3 else {
    fputs("Usage: extract-pdf-images.swift input.pdf output-directory\n", stderr)
    exit(1)
}

let inputURL = URL(fileURLWithPath: CommandLine.arguments[1]) as CFURL
let outputURL = URL(fileURLWithPath: CommandLine.arguments[2], isDirectory: true)

guard let document = CGPDFDocument(inputURL) else {
    fputs("Unable to open PDF.\n", stderr)
    exit(1)
}

try FileManager.default.createDirectory(at: outputURL, withIntermediateDirectories: true)

final class ExtractionContext {
    let page: Int
    let outputURL: URL
    var imageIndex = 0

    init(page: Int, outputURL: URL) {
        self.page = page
        self.outputURL = outputURL
    }
}

func extractImage(_ key: UnsafePointer<CChar>, _ object: CGPDFObjectRef, _ info: UnsafeMutableRawPointer?) {
    guard let info else { return }
    let context = Unmanaged<ExtractionContext>.fromOpaque(info).takeUnretainedValue()
    var stream: CGPDFStreamRef?
    guard CGPDFObjectGetValue(object, .stream, &stream), let stream else { return }

    guard let dictionary = CGPDFStreamGetDictionary(stream) else { return }
    var subtype: UnsafePointer<CChar>?
    guard CGPDFDictionaryGetName(dictionary, "Subtype", &subtype),
          let subtype,
          String(cString: subtype) == "Image"
    else { return }

    var format = CGPDFDataFormat.raw
    guard let imageData = CGPDFStreamCopyData(stream, &format) as Data? else { return }

    var width: CGPDFInteger = 0
    var height: CGPDFInteger = 0
    CGPDFDictionaryGetInteger(dictionary, "Width", &width)
    CGPDFDictionaryGetInteger(dictionary, "Height", &height)

    context.imageIndex += 1
    let ext: String
    switch format {
    case .jpegEncoded: ext = "jpg"
    case .JPEG2000: ext = "jp2"
    default: ext = "bin"
    }

    let filename = String(
        format: "page-%02d-image-%02d-%ldx%ld.%@",
        context.page,
        context.imageIndex,
        width,
        height,
        ext
    )

    do {
        try imageData.write(to: context.outputURL.appendingPathComponent(filename))
    } catch {
        fputs("Could not write \(filename): \(error)\n", stderr)
    }
}

for pageNumber in 1...document.numberOfPages {
    guard let page = document.page(at: pageNumber),
          let pageDictionary = page.dictionary
    else { continue }
    var resources: CGPDFDictionaryRef?
    guard CGPDFDictionaryGetDictionary(pageDictionary, "Resources", &resources),
          let resources
    else { continue }

    var objects: CGPDFDictionaryRef?
    guard CGPDFDictionaryGetDictionary(resources, "XObject", &objects),
          let objects
    else { continue }

    let context = ExtractionContext(page: pageNumber, outputURL: outputURL)
    let pointer = Unmanaged.passUnretained(context).toOpaque()
    CGPDFDictionaryApplyFunction(objects, extractImage, pointer)
}

print("Extracted PDF images to \(outputURL.path)")
