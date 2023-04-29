let headers = ['son', 'daughter', 'niece', 'nephew', 'cousin']
headers = headers.splice(0,3)

let entries = [['here', 'there', 'gone'],['here', 'there', 'gone'],['here', 'there', 'gone']]
entries = entries.map(entry => entry.splice(0, 2))

console.log(entries)