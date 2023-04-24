import string_conversion from "@/pages/api/string_conversion";
import number_conversion from "@/pages/api/number_conversion";

export default function type_conversion(headers, entries, template, warnings) {
    return new Promise((resolve, reject) => {
        try {
            for (let i = 0; i < headers.length; i++) {
                if (i >= template.length || template[i].type === "string") {
                    entries = string_conversion(i, entries);
                } else {
                    entries = number_conversion(i, entries);
                }
            }
            resolve({content: [headers, entries], warnings: warnings});
        } catch (error) {
            reject(error);
        }
    });
}