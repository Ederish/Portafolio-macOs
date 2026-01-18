<?php 
$apiUrl = 'https://animejapangeek.com/wp-json/wp/v2/media';

function getApiData(string $url): void {

    $curl = curl_init($url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

    $response = curl_exec($curl);
    curl_close($curl);

    if (!$response) {
        echo "Error al obtener datos";
        return;
    }

    $data = json_decode($response, true);

    if (!is_array($data)) {
        echo "Respuesta inválida";
        return;
    }

    foreach ($data as $media) {

        $imageUrl = $media['source_url'] ?? '';
        $mediaId  = $media['id'] ?? uniqid();

        if (!$imageUrl) continue;

        $popoverId = "popover-$mediaId";

        echo '
        <div class="popup-container" popover id="'. $popoverId .'">
            <img src="'. htmlspecialchars($imageUrl) .'" />
        </div>

        <button 
            class="swiper-slide swiper-no-swiping" 
            popovertarget="'. $popoverId .'"
            style="background-image: url('. htmlspecialchars($imageUrl) .');">
        </button>';
    }
}
getApiData($apiUrl);