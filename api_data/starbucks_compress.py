import json, jsonpickle
f1 = open('starbucks.json', 'r')
raw_data = f1.read()
f1.close()
py_data=jsonpickle.decode(raw_data)
py_data_compressed={
	"center": {
      "lat": py_data.region.center.latitude,
      "lng": py_data.region.center.longitude
    },
    "businesses" : []
}
i = 0;
for biz in py_data.businesses:
	i=i+1;
	biz_compressed={
		"id": i,
		"store_address" : '-'.join(biz.location.display_address),
		"rating": biz.rating,
		"display_phone": biz.display_phone,
		"snippet_image_url": biz.snippet_image_url,
		"cord": {
			"lat": biz.location.coordinate.latitude,
			"lng": biz.location.coordinate.longitude
		},
		"location": {
			"city": biz.location.city,
			"display_address": biz.location.display_address
		}
	}
	py_data_compressed["businesses"].append(biz_compressed)

# jsontext=jsonpickle.encode(py_data_compressed)
jsontext_fmt=json.dumps(py_data_compressed, indent=4, sort_keys=False)
jsontext_fmt="var data = "+jsontext_fmt
f2 = open('api_data.js', 'w')
f2.write(jsontext_fmt)
f2.close()
