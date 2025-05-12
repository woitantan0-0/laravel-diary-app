export default function ApplicationLogo(props) {
    return (
        <img
            src={
                props.imagePass
                    ? props.imagePass + "image/logoHp.jpeg"
                    : "./image/logoHp.jpeg"
            }
            className="App-logo"
            alt="logo"
        />
    );
}
