import {
    HelpBox,
    InnerBox4,
    InsideHelpBox,
    OuterBox,
    StackColumnBox,
    StackRowBox
} from "/public/components/common/Boxes";
import NavBar from "/public/components/NavBar";
import Footer from "/public/components/Footer";
import {BoldText, Text} from "/public/components/common/Typographies";
import {HeightSpacer, WidthSpacer} from "/public/components/common/Spacers";
import {HelpMenuButton} from "/public/components/common/Buttons";

const info = [
    {
        title: "General",
        subs: [
            {
                title: "Single Command",
                description: "Break up your commands so that each request is a single command. Instead of Hey Stud, please first dedupe my data by the \'Name\' column and then sort by the \'Age\' column, try Hey Stud, please dedupe my data by the \'Name\' column and then Hey Stud, please sort my data by the \'Age\' column",
                wrong: [
                    "Hey Stud, please first dedupe my data by the \'Name\' column and then sort by the \'Age\' column"
                ],
                right: [
                    "Hey Stud, please dedupe my data by the \'Name\' column",
                    "Hey Stud, please sort my data by the \'Age\' column"
                ]
            },
            {
                title: "Be Specific",
                description: "While Stud is pretty smart, it's not a mind reader. Be specific with your commands. Let Stud know what data cleansing task you want to perform, which columns you want to perform it on, what format you have your data in, and what format you want your data in. For example, Hey Stud, please reformat my date column from \'MM/DD/YYYY\' to \'YYYY-MM-DD\'",
                right: [
                    "Hey Stud, please reformat my date column from \'MM/DD/YYYY\' to \'YYYY-MM-DD\'"
                ]
            },
        ]
    },
    {
        title: "Dedupe",
        subs: [
            {
                title: "Specify Column(s)",
                description: "Specify the column(s) that indicate what a duplicate is. Try, Hey Stud, please dedupe my data by the \'Name\' column",
                right: [
                    "Hey Stud, please dedupe my data by the \'Name\' column"
                ]
            },
        ]
    },
    {
        title: "Sort",
        subs: [
            {
                title: "Specify Column(s)",
                description: "Specify the column(s) that you want to sort by. Try, Hey Stud, please sort my data by the \'Age\' column",
                right: [
                    "Hey Stud, please sort my data by the \'Age\' column"
                ]
            },
            {
                title: "Specify Order",
                description: "Specify the order that you want to sort by. Try, Hey Stud, please sort my data by the \'Age\' column in descending order",
                right: [
                    "Hey Stud, please sort my data by the \'Age\' column in descending order"
                ]
            },
            {
                title: "Specify Sort Type",
                description: "In some cases, you may need to specify whether you want to sort by text or by number. Try, Hey Stud, please sort my data by the \'Age\' column as a number",
                right: [
                    "Hey Stud, please sort my data by the \'Age\' column as a number"
                ]
            }
        ]
    },
    {
        title: "Find and Replace",
        subs: [
            {
                title: "Case Sensitive",
                description: "By default, Stud is case sensitive. If you want to ignore case, try, Hey Stud, please find and replace \'Stud\' with \'StudAI\' in the \'Name\' column ignoring case Otherwise, Stud will only replace \'Stud\' with \'StudAI\' if the word is capitalized as \'Stud\' (ignoring \'STUD\', \'stud\', etc.).",
                right: [
                    "Hey Stud, please find and replace \'Stud\' with \'StudAI\' in the \'Name\' column ignoring case"
                ]
            },
            {
                title: "Value vs. Contains",
                description: "By default, Stud will only replace cell values that match exactly. If you want to replace values that are contained within a cell, try, Hey Stud, please find all cells that contain \'Stud\' and replace it with \'StudAI\'",
                right: [
                    "Hey Stud, please find all cells that contain \'Stud\' and replace it with \'StudAI\'"
                ]
            }
        ]
    },
    {
        title: "Filter",
        subs: [
            {
                title: "Discard or Keep",
                description: "Specify whether you want to discard or keep the rows that match your filter. Try, Hey Stud, please discard all rows that contain \'Stud\' in the \'Name\' column",
                right: [
                    "Hey Stud, please discard all rows that contain \'Stud\' in the \'Name\' column"
                ]
            }
        ]
    },
    {
        title: "Reformat",
        subs: [
            {
                title: "Specify Old and New formats",
                description: "Specify the old and new formats of the column that you want to reformat. Try, Hey Stud, please reformat my date column from \'MM/DD/YYYY\' to \'YYYY-MM-DD\'",
                right: [
                    "Hey Stud, please reformat my date column from \'MM/DD/YYYY\' to \'YYYY-MM-DD\'"
                ]
            }
        ]
    },
    {
        title: "Split",
        subs: [
            {
                title: "Specify Split Character Sequence",
                description: "Specify the character sequence that you want to split by. Instead of Hey Stud, please split my values in the \'Name\' column, try Hey Stud, please split my values in the \'Name\' column by a space (\' \')",
                wrong: [
                    "Hey Stud, please split my values in the \'Name\' column"
                ],
                right: [
                    "Hey Stud, please split my values in the \'Name\' column by a space (\' \')"
                ]
            },
            {
                title: "Specify Split Index",
                description: "Rather than specifying a character sequence to split by, you can also specify the index of the string that you want to split by. Try, Hey Stud, please split my values in the \'Name\' column by the 2nd character",
                right: [
                    "Hey Stud, please split my values in the \'Name\' column by the 2nd character"
                ]
            },
            {
                title: "Specify Action After Split",
                description: "Specify what you want to do after splitting. Do you want a new column formed? Do you want 2 columns to replace the first? Do you want to keep part of the split value to replace the original value? Try, Hey Stud, please split my values in the \'Name\' column by a space (\' \') and keep the first part of the split value",
                right: [
                    "Hey Stud, please split my values in the \'Name\' column by a space (\' \') and keep the first part of the split value"
                ]
            }
        ]
    },
    {
        title: "Merge",
        subs: [
            {
                title: "Specify How to Merge",
                description: "Specify how you want to merge your columns or rows. What column/row stays? What does the new column/row look like? Try, Hey Stud, please merge my \'First Name\' and \'Last Name\' columns into a single \'Name\' column. Values in the new \'Name\' column will follow the pattern \'[First Name] [Last Name]\'",
                right: [
                    "Hey Stud, please merge my \'First Name\' and \'Last Name\' columns into a single \'Name\' column. Values in the new \'Name\' column will follow the pattern \'[First Name] [Last Name]\'"
                ]
            }
        ]
    },
    {
        title: "Null or Empty Values",
        subs: [
            {
                title: "Representation",
                description: "In CSV files, null or empty values are represented by an empty string (\"\"). You may need to clarify this to Stud if you are referencing a column that contains null or empty values. Try, Hey Stud, please delete all rows that have an empty value (\"\") in the \'Name\' column",
                right: [
                    "Hey Stud, please delete all rows that have an empty value (\"\") in the \'Name\' column"
                ]
            },
            {
                title: "Merging with Null Values",
                description: "Specify how to merge with null values. Try, Hey Stud, please merge my \'First Name\' and \'Last Name\' columns into a single \'Name\' column. Values in the new \'Name\' column will follow the pattern \'[First Name] [Last Name]\'. If either \'First Name\' or \'Last Name\' is null (\"\"), then the new \'Name\' column will be the non-null value",
                right: [
                    "Hey Stud, please merge my \'First Name\' and \'Last Name\' columns into a single \'Name\' column. Values in the new \'Name\' column will follow the pattern \'[First Name] [Last Name]\'. If either \'First Name\' or \'Last Name\' is null (\"\"), then the new \'Name\' column will be the non-null value"
                ]
            }
        ]
    },
    {
        title: "Headers",
        subs: [
            {
                title: "Leniency",
                description: "The only info Stud receives are your header fields. Because of this, you can actually be less specific when referring to header fields. For example, instead of Hey Stud, please swap the \'First Name\' and \'Last Name\' columns, you can just say Hey Stud, please swap the first and last name columns",
                wrong: [
                    "Hey Stud, please swap the \'First Name\' and \'Last Name\' columns"
                ],
                right: [
                    "Hey Stud, please swap the first and last name columns"
                ]
            }
        ]
    }
]

export default function Help() {
    const handleScrollClick = (id) => {
        const scrollable = document.documentElement;
        const element = document.getElementById(id);
        const scrollOffset = 90; // Adjust this value as needed
        const newScrollPosition = element.offsetTop - scrollOffset;
        scrollable.scrollTo({
            top: newScrollPosition,
            behavior: 'smooth'
        });
    }

    const formatDescription = (sub) => {
        // Replace quotes with <strong> tags
        let description = sub.description
        const right = sub.right
        const styleRight = "color: #53B753;"
        if (right) {
            right.forEach((right) => {
                description = description.replace(right, `<strong style="${styleRight}">${right}</strong>`)
            })
        }
        const wrong = sub.wrong
        const styleWrong = "color: #ce2029;"
        if (wrong) {
            wrong.forEach((wrong) => {
                description = description.replace(wrong, `<strong style="${styleWrong}">${wrong}</strong>`)
            })
        }
        return <Text style={{ lineHeight: "1.5rem" }} dangerouslySetInnerHTML={{ __html: description }} />;
    }

    return (
        <OuterBox>
            <NavBar/>
            <InnerBox4>
                <StackRowBox>
                    <HelpBox>
                        <InsideHelpBox>
                            <HeightSpacer height={"1rem"}/>
                            <BoldText size={"1.25rem"}>Jump to...</BoldText>
                            <HeightSpacer height={"1rem"}/>
                            {info.map((section, i) => {
                                return (
                                    <HelpMenuButton onClick={() => handleScrollClick(section.title)}>{section.title}</HelpMenuButton>
                                )})}
                        </InsideHelpBox>
                    </HelpBox>
                    <WidthSpacer width={"5rem"}/>
                    <StackColumnBox>
                        <HeightSpacer height={"1rem"}/>
                        {info.map((section, i) => {
                            return (
                                <>
                                    <BoldText size={"2rem"} id={section.title}>{section.title}</BoldText>
                                    <HeightSpacer height={"1.5rem"}/>
                                    {section.subs.map((sub, j) => {
                                        return (
                                            <>
                                                <BoldText size={"1.25rem"}>{sub.title}</BoldText>
                                                <HeightSpacer height={"1rem"}/>
                                                {formatDescription(sub)}
                                                <HeightSpacer height={"1rem"}/>
                                            </>
                                        )})}
                                    <HeightSpacer height={"1rem"}/>
                                </>
                            )})}
                    </StackColumnBox>
                </StackRowBox>
                <Footer/>
            </InnerBox4>
        </OuterBox>
    )
}