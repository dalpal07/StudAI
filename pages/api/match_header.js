import match_header_order from "@/pages/api/match_header_order";
import match_header_value from "@/pages/api/match_header_value";
import delete_unmatched_header from "@/pages/api/delete_unmatched_header";

export default function match_header(headers, entries, template, warnings) {
    return new Promise((resolve, reject) => {
        try {
            match_header_value(headers, entries, template, warnings)
                .then(data => {
                    let [headers,entries] = data.content;
                    let warnings = data.warnings;
                    return match_header_order(headers, entries, template, warnings);
                })
                .then(data => {
                    let [headers,entries] = data.content;
                    let warnings = data.warnings;
                    return delete_unmatched_header(headers,entries,template,warnings);
                })
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
