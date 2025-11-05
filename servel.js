fetch("https://api.servel.cl/private/registro", {
  "headers": {
    "accept": "application/json, text/plain, */*",
    "accept-language": "es-ES,es;q=0.8",
    "content-type": "application/json;charset=UTF-8",
    "priority": "u=1, i",
    "sec-ch-ua": "\"Brave\";v=\"141\", \"Not?A_Brand\";v=\"8\", \"Chromium\";v=\"141\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Linux\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site",
    "sec-gpc": "1",
    "Referer": "https://consulta.servel.cl/"
  },
  "body": "{\"cedula\":\"20838157\",\"response\":\"0cAFcWeA6-XbtnYNfniZOZORHVtnOKHsjwIi_8HYgqGW5oHD5J0Pr_5cvc4M5hjsTgxhjH4w9bad2Y8MHEyLRTZt2uDLM8JxiecL-SPvrB4sgrRvfDteqYGoBU1DyE_dXFBmBookyePgZsSCupMk6OzSxBaBjJu_xchO7AzBrD2LsBJI3vxJ1LylyZR9AEf5WLGjwtfqWJ_YoLHsW2U4ZGi1wv4735XRCEAA6iTRazasxW_GpNAkivBTd4KCpkYNE0wKHLBYUQg660sNfLE-PJqTDuO-BNngKdCaQ3Wshqw3K--vPyjp9W1Ss_CbecEis4vaAwO0T4qJfucoe9QlRj_Algrru-ff_sTLCv-X630BLkHjJpozgerk0HJovBv4-UU-QaoBzdOm9g1Z36sIfHEHeQroPOc6hapQNbGDthz8bVmzvY4D94hww2xAr8fmTHB2H5XZlnoC7wteBG0mY_9XLIaFt-bPAvuwwFXR9d5CWgJpEtkOsXpJiXyuPxM5fD2wlGDz6MvYTzcQfF-3mAC-DZYyvTweVqfY7luYSvEE7x43YqnsZpceSI6uo0AR4mFL4fT3o65DDje9SDp0SDWY3pISLtj92r6up-hIEHsW8mO_xJT_qlMkQsbgEFbqkWcSZ7ifcfH-EANpp7_IfjpfGZ34eLQPqC43yEX8h0W96td8JLSxa6sOdTnkLpM9hlHwSllS5fFpRWebff5Mk6xT3X2PNo4Y9o-Q7k1my-Znrax2yxiWzudSUMu7gSyY37stFlKHXKPJTE2gciwFYHPMTRx-I_rXbaCcRTTraf74Rbv1ed4Eb4g_6xu6jjBzSo2hjjDkqTobNbmBiZ3DeOPGjUkH9H1CnXKiuSi34a54M1fsNt8f9CCbpGhdosp4SeTB5EkZYZAc_L2psMjwBMCbgkEfJDz3icuO0SutRPyGxSl5exQIcIyl1HwWkqlRnLdfQwgdPOjDeyd9DJhOoMPhqSQmIzO1-3iDoOl6Xv5B7-rhXTgqByBBny44aMxj8Xoe_pyuWpYjyNAC1ODs95zEl7yE7bFo77mIhh3jFVY4I2hQv7KLes_C9QRLvfs_z7ur4K7TDpe3gx5-0qKMpVJi3PX_H_kUK9oD0_IVLPQuYmlTwXnhqQO2vbJ3ETk4ilFvmCrHHdJ3b1vaERMz9jNcZ601urHADSznpZWZTlVITsjakFihxpjYLffFpTe8NieWHclijrHhh87NuN8O3eFfiUIs54VMOKLEQweh1GtikN9rpf2Qsw9OkIMd-_m0uTpFqmsOs7XoMZ4KjFDbuq953LK_YzZosr5P5zzv7dEgVSUXhrd3ONT-6fwnol_ra9r0ia0VFA0JOl9OYqEp87urA_kNN2koA0MitLvNJ44cPYK7PVlVUlVk5Masecs332s3wfD8M_w5NpVrWv2-EshiZIh28qYI-7BxcKEDREN37pc3FPJ0CBo11df9t99OkcI1re0-cz7E1K7qVcJ-zNL9bCKYOkWAwcpK8RBJRaMWs9p17pJiwsfdOPMSD8A5fFKi-DeGeIfvX22d4ayWLEv5EBkvK5Mqq_HMmkN3fa48NPbhBotxjrKnGMe7m1dUkBKQN9ncFv68IW\"}",
  "method": "POST"
}).then(response => {
  return response.json();
}).then(data => {
  console.log(data);
});
