# Kanttiinit
## Setup
The following ENV variables need to be set:  
* `GCLOUD_PROJECT`: id of our google cloud project  
* `GOOGLE_APPLICATION_CREDENTIALS`: location of the gcp service account file  
* `GCLOUD_STORAGE_BUCKET`: name of the gcp storage bucket  


## Routes
`/restaurants`: displays information for all restaurants  
`/restaurants/:name`: displays information for specific restaurant  
`/restaurants/:name/meals`: displays all meals of the day for specific restaurant  
`/restaurants/:name/ratings`: displays restaurant ratings for a specific restaurant  
