"""
U: Convert nested list to nested dictionary, return dictionary

P: Build a dictionary
Base case:
if len(section) == 1:
    return section[0]

assign section[0] to key
assign section[1] to value, call recusive function on section[1]

dict = {section[0]: map_chambers(sections[1])}
I:

"""

def map_chambers(sections):
    if len(sections) == 1:
        return sections[0]
    dict = {}
    dict[sections[0]] = map_chambers(sections[1])
    return dict
    


sections = ["Atlantis", ["Coral Cave", ["Pearl Chamber", ["testing"]]]]
print(map_chambers(sections))

#{'Atlantis': {'Coral Cave': 'Pearl Chamber'}}
