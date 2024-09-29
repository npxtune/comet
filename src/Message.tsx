import {Avatar, useTheme} from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {MessageModel} from "./Messages.tsx";
import {
    blue, lightBlue, red, orange, yellow
} from "@mui/material/colors";

export default function Message(message: MessageModel) {
    const theme = useTheme();

    const colors = [
        blue[500],
        lightBlue[500],
        red[500],
        orange[500],
        yellow[500],
    ];

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                gap: theme.spacing(1),
                paddingTop: theme.spacing(1),
                paddingBottom: theme.spacing(1),
            }}>
            <Box>
                <Typography>      </Typography>
            </Box>
            <Avatar sx={{bgColor: colors[message.SenderId % colors.length]}}>{message.SenderId.toString()}</Avatar>
            <Box flexDirection="column">
                <Typography variant="subtitle2">Nutzer {message.SenderId.toString()}</Typography>
                <Typography>
                    {message.Text}
                </Typography>
            </Box>
        </Box>
    );
}
