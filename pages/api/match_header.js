import match_header_order from "@/pages/api/match_header_order";

export default function match_header(headers, entries, template, warnings) {
    return new Promise((resolve, reject) => {
        try {
            match_header_order(headers, entries, template, warnings)
                .then(data => {
                    let [headers,entries] = data.content;
                    let warnings = data.warnings;
                    resolve({content: [headers, entries], warnings: warnings});
                })
        } catch (error) {
            reject(error);
        }
    });
}
