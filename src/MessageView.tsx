import Message from "./Message.tsx";
import {useMessages} from "./Messages.tsx";

export default function MessageView() {
    let messages = useMessages();
    return (
        messages.messages.map((msg, _) =>
            Message(msg)
        )
    );
}