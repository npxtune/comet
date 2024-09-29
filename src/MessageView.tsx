import Message from "./Message.tsx";
import {useMessages} from "./Messages.tsx";
import Box from "@mui/material/Box";

export default function MessageView() {
    let messages = useMessages();
    return (
        <Box sx={{overflowY: 'scroll', flexGrow: 1}}>
            {
                messages.messages.map(
                    (msg, _) => Message(msg)
                )
            }
        </Box>
    );
}