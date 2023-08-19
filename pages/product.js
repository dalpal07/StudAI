import FileUpload from "../public/components/file-upload/FileUpload";
import Script from "../public/components/Script";
import {useEffect, useState} from "react";
import Run from "../public/components/Run";
import {InnerBox2, OuterBox} from "../public/components/common/Boxes";
import {HeightSpacer} from "../public/components/common/Spacers";
import ExtendPrompt from "../public/functions/ExtendPrompt";
import Loading from "../public/components/conditionals/Loading";
import Verify from "../public/components/conditionals/Verify";
import {useRouter} from "next/router";
import NavBar from "../public/components/NavBar";
import {useUser} from "@auth0/nextjs-auth0/client";
import Footer from "../public/components/Footer";
import LowerChat from "../public/components/chat/LowerChat";

export default function Product() {
    const [req, setReq] = useState(null)
    const [dataHistory, setDataHistory] = useState([{headers: [], entries: [], prev: null, next: null}])
    const [dataIndex, setDataIndex] = useState(0)
    const [fileName, setFileName] = useState("")
    const [script, setScript] = useState("")
    const [dataProcessing, setDataProcessing] = useState(false)
    const [verifyReplaceFile, setVerifyReplaceFile] = useState(false)
    const [verifyClearFile, setVerifyClearFile] = useState(false)
    const [replaceFileVerified, setReplaceFileVerified] = useState(null)
    const [clearFileVerified, setClearFileVerified] = useState(null)
    const [disabled, setDisabled] = useState(false)
    const [requestCancelled, setRequestCancelled] = useState(false)

    const { user, isLoading, error } = useUser();
    const router = useRouter();
    const [isPaid, setIsPaid] = useState(null);
    const [requests, setRequests] = useState(0);
    const [type, setType] = useState("");

    useEffect(() => {
        if (user) {
            const apiUrl = `/api/user/`;
            const queryParams = new URLSearchParams({ id: user.sub });
            fetch(`${apiUrl}get-subscription-type?${queryParams}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }).then((response) => response.json()).then((subscription) => {
                setType(subscription.type);
                if (subscription.type === "owner" || subscription.type === "unlimited") {
                    setIsPaid(true);
                }
                else if (subscription.type === "standard" || subscription.type === "free") {
                    fetch(`${apiUrl}get-subscription-requests?${queryParams}`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }).then((response) => response.json()).then((data) => {
                        if ((subscription.type === "standard" && data.requests < 150) || (subscription.type === "free" && data.requests < 50)) {
                            setIsPaid(true);
                        }
                        else {
                            router.push("/payment");
                        }
                    });
                }
                else {
                    router.push("/payment");
                }
            });
            fetch(`${apiUrl}get-subscription-requests?${queryParams}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }).then((response) => response.json()).then((data) => {
                setRequests(data.requests);
            });
        }
        else {
            router.push("/api/auth/login");
        }
    }, [user])

    useEffect(() => {
        if (isPaid) {
            if (disabled) {
                document.getElementById("inner").style.setProperty("opacity", "0.5")
                document.body.style.setProperty("overflow", "hidden")
            } else {
                document.getElementById("inner").style.setProperty("opacity", "1")
                document.body.style.setProperty("overflow", "auto")
            }
        }
    }, [disabled])
    useEffect(() => {
        if (dataProcessing || verifyReplaceFile || verifyClearFile) {
            setDisabled(true)
        }
        else {
            setDisabled(false)
        }
    }, [dataProcessing, verifyReplaceFile, verifyClearFile])

    if (user && isPaid) {
        return (
            <OuterBox>
                <NavBar/>
                <InnerBox2 id={"inner"}>
                    <HeightSpacer height={"0.75rem"}/>
                    <Run headers={dataHistory[dataIndex].headers} entries={dataHistory[dataIndex].entries}
                         script={script} fileName={fileName} setDataProcessing={setDataProcessing}
                         setDataIndex={setDataIndex} setDataHistory={setDataHistory} disabled={disabled}
                         dataIndex={dataIndex} dataHistory={dataHistory} setFileName={setFileName}
                         verify={verifyClearFile} setVerify={setVerifyClearFile} clearFileVerified={clearFileVerified}
                         setClearFileVerified={setClearFileVerified}
                         setScript={setScript} requestCancelled={requestCancelled}
                         setRequestCancelled={setRequestCancelled}/>
                    <HeightSpacer height={"1rem"}/>
                    <FileUpload setFileName={setFileName} fileName={fileName} disabled={disabled}
                                headers={dataHistory[dataIndex].headers} setDataHistory={setDataHistory}
                                entries={dataHistory[dataIndex].entries} setDataIndex={setDataIndex}
                                verify={verifyReplaceFile} setVerify={setVerifyReplaceFile}
                                replaceFileVerified={replaceFileVerified}
                                setReplaceFileVerified={setReplaceFileVerified}/>
                    <HeightSpacer height={"1.5rem"}/>
                    <LowerChat disabled={disabled} fileName={fileName} setRequests={setRequests} setReq={setReq}/>
                    <HeightSpacer height={"1.5rem"}/>
                    <Script setScript={setScript} req={req} setReq={setReq}
                            headers={dataHistory[dataIndex].headers}
                            setDataProcessing={setDataProcessing}
                            dataProcessing={dataProcessing}
                            requestCancelled={requestCancelled} setRequestCancelled={setRequestCancelled}/>
                    <HeightSpacer height={"1.5rem"}/>
                    <Footer/>
                </InnerBox2>
                <Loading dataProcessing={dataProcessing} setDataProcessing={setDataProcessing}
                         setRequestCancelled={setRequestCancelled}/>
                <Verify verify={verifyReplaceFile} setVerified={setReplaceFileVerified}
                        message={"Are you sure you want to replace this file? This action cannot be undone."}/>
                <Verify verify={verifyClearFile} setVerified={setClearFileVerified}
                        message={"Are you sure you want to clear this file? This action cannot be undone."}/>
            </OuterBox>
        )
    }
    else if (user && isPaid === false) {
        router.push("/pricing");
    }
}