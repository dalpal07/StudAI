import {Box, styled} from "@mui/material";

export const BasicBox = styled(Box)({
    display: "flex",
});
export const StackColumnBox = styled(BasicBox)({
    flexDirection: "column",
});
export const StackRowBox = styled(BasicBox)({
    flexDirection: "row",
});
// index.js
export const OuterBox = styled(StackColumnBox) ({
    borderRadius: "0.3125rem",
    background: "#EEE",
    height: "100vh",
});
// intro.js
export const InnerBox = styled(StackColumnBox)({
    position: "absolute",
    top: 50,
    bottom: 0,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flex: "1 0 0",
    alignSelf: "stretch",
    background: "linear-gradient(180deg, #F2F2F2 0%, rgba(242, 242, 242, 0.00) 57.81%, rgba(83, 183, 83, 0.16) 100%)",
});
// Product.js
export const InnerBox2 = styled(StackColumnBox) ({
    margin: "0.75rem 1.5rem",
    height: "100%",
});
export const OverlayContainer = styled(BasicBox) ({
    position: "fixed",
    top: "30%",
    width: "100%",
    justifyContent: "center",
});
export const OverlayBox = styled(StackColumnBox) ({
    background: "#F2F2F2",
    boxShadow: "0px 0px 1px 0px rgba(0, 0, 0, 0.30), 0px 0px 8px 0px rgba(0, 0, 0, 0.15), 0px 0px 20px 0px rgba(0, 0, 0, 0.05)",
    width: "35rem",
    height: "15rem",
    justifyContent: "center",
    alignItems: "center",
});
export const VerifyOverlayBox = styled(OverlayBox) ({
    width: "25rem",
    height: "10rem",
    textAlign: "center",
    padding: "0.75rem 1.5rem",
});
export const Spinner = styled(Box) ({
    width: 64,
    height: 64,
    border: "8px solid",
    borderColor: "var(--main-green, #53B753) transparent var(--main-green, #53B753) transparent",
    borderRadius: "50%",
    animation: "spin-anim 1.2s linear infinite",
    marginBottom: "1.5rem",
});
// Chat.js
export const ChatBox = styled(StackColumnBox)({
    height: "100%",
    minHeight: "15rem",
    padding: "1.125rem",
    paddingLeft: "1.75rem",
    paddingRight: "1.75rem",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: "0.5rem",
    flex: "1 0 0",
    borderRadius: "1.25rem",
    border: "1px solid var(--low-opacity-black, rgba(63, 54, 54, 0.25))",
    background: "#F2F2F2",
});
export const UpperBox = styled(Box)({
    overflowY: "scroll",
    width: "100%"
});
export const AssistantChatLine = styled(BasicBox)({
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
});
export const UserChatLine = styled(BasicBox)({
    justifyContent: "flex-end",
    alignItems: "flex-end"
});
const ChatMessage = styled(Box)({
    textAlign: "left",
    fontFamily: "Inter",
    fontSize: "0.875rem",
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: "normal",
    padding: "0.75rem 1.125rem",
    gap: "0.625rem",
    borderRadius: "1.25rem",
    marginBottom: "0.75rem",
    maxWidth: "60%",
});
export const UserChatMessage = styled(ChatMessage)({
    alignItems: "flex-end",
    background: "#E3E3E3",
    color: "var(--main-black, #3F3636)",
});
export const AssistantChatMessage = styled(ChatMessage)({
    background: "#53B753",
    color: "#F2F2F2",
});

export const BottomBox = styled(BasicBox)({
    width: "100%",
    height: "fit-content",
    alignItems: "top",
    justifyContent: "center",
});

export const ChatInputOuterBox = styled(BasicBox)({
    padding: "0.5rem 1rem",
    alignItems: "center",
    gap: "0.5rem",
    borderRadius: "1.25rem",
    background: "#E3E3E3",
    height: "fit-content",
    width: "100%",
});
// FileContent.js
export const TableContainer = styled(Box)({
    width: "100%",
    height: "100%",
    overflow: "scroll",
});
// NavBar.js
export const NavBox = styled(BasicBox) ({
    position: "sticky",
    top: 0,
    zIndex: 1,
    padding: "1rem 1.5rem",
    alignItems: "center",
    gap: "1.75rem",
    alignSelf: "stretch",
    backgroundColor: "#F2F2F2",
    boxShadow: "0px 0px 1px 0px rgba(0, 0, 0, 0.30), 0px 0px 8px 0px rgba(0, 0, 0, 0.15), 0px 0px 20px 0px rgba(0, 0, 0, 0.05)"
});

export const ProfileBox = styled(BasicBox)({
    alignItems: "center",
});
// NoFileContent.js
export const TextBox = styled(StackColumnBox)({
    justifyContent: "center",
    alignItems: "center",
    gap: "0.5rem",
});
// Run.js
export const DownloadContainer = styled(StackRowBox) ({
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "1rem",
    marginBottom: "1rem",
});