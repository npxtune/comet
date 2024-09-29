import {Avatar} from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {MessageModel} from "./Messages.tsx";

export default function Message(message: MessageModel) {
    return (
        <Box>
            <Avatar>{message.SenderId.toString()}</Avatar>
            <Typography variant="subtitle2">User {message.SenderId.toString()}</Typography>
            <Typography>
                {message.Text}
            </Typography>
        </Box>
    );
}
