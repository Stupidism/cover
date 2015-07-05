# cover 

# Nginx config

Add the following section to your nginx site config to enable API access.

    location /api/ {
      proxy_pass http://202.120.40.73:36038/VideoPlatform/;
    }
    # The section is below for file (video, pdf...) access on the same domain.
    location /VPFile/ {
      proxy_pass http://202.120.40.73:36038/VPFile/;
    }

# Postman API share link:
https://www.getpostman.com/collections/8678497f76e30749d6c6

