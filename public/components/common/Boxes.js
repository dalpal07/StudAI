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
    width: "100%",
});
// intro.js
export const InnerBox = styled(StackColumnBox)({
    position: "absolute",
    top: 0,
    bottom: 0,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flex: "1 0 0",
    alignSelf: "stretch",
    background: "linear-gradient(180deg, #F2F2F2 0%, rgba(242, 242, 242, 0.00) 57.81%, rgba(83, 183, 83, 0.16) 100%)",
});
export const InnerBox3 = styled(InnerBox)({
    top: -50,
});
// product.js
export const InnerBox2 = styled(StackColumnBox) ({
    padding: "1rem 2rem",
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
    position: "fixed",
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
    minHeight: "15rem",
    maxHeight: "15rem",
    padding: "1.125rem 1.75rem",
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
    width: "100%",
    height: "fit-content",
    maxHeight: "100%",
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
    display: "flex",
    flexDirection: "row",
});

export const ChatInputOuterBox = styled(BasicBox)({
    padding: "0.5rem 1rem",
    alignItems: "flex-end",
    borderRadius: "1.25rem",
    background: "#E3E3E3",
    height: "fit-content",
    maxHeight: "5rem",
    overflowY: "scroll",
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
});
// beta-announcement.js
export const BetaContainer = styled(StackRowBox) ({
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    lineHeight: "1rem",
});
// Payment.js
export const BannerBox = styled(Box) ({
    backgroundColor: "#53B753",
    transform: "rotate(-45deg)",
    color: "#F2F2F2",
    width: "fit-content",
    padding: "0.25rem",
    position: "absolute",
    top: "1.7rem",
    left: "-0.4rem",
});
export const BannerLeftTriangle = styled(Box) ({
    transform: "rotate(-45deg)",
    width: "fit-content",
    position: "absolute",
    top: "4.2rem",
    left: "-0.65rem",
});
export const BannerRightTriangle = styled(Box) ({
    transform: "rotate(45deg)",
    width: "fit-content",
    position: "absolute",
    top: "-0.89rem",
    left: "4.1rem",
});

export const Line = styled(Box) (({width, height}) => ({
    display: "flex",
    border: "0.5px solid var(--low-opacity-black, rgba(63, 54, 54, 0.25))",
    width: width,
    height: height,
}));