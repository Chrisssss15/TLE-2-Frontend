
function Letter({ sign }) {
    return (
        <li className="bg-white p-4 rounded-lg shadow-lg text-center">
            <h3 className="text-lg font-semibold mb-2">{sign.definition}</h3>
            {sign.video_path.match(/\.(mp4|webm|ogg)$/i) ? (
                <video width="200" controls className="mx-auto">
                    <source src={sign.video_path} type="video/mp4"/>
                    Je browser ondersteunt geen video-element.
                </video>
            ) : (
                <img src={sign.video_path} alt={sign.definition} width="200" className="mx-auto"/>
            )}
        </li>
    );
}
export default Letter;




