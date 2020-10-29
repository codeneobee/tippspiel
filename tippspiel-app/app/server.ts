import {app} from "./app";

app.listen(process.env.NODE_PORT || 3000, () => {
    console.log(`Example app listening on port ${process.env.NODE_PORT || 3000}`);
})