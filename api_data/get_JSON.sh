#!/bin/bash
# Program
# This program shows hello world!
# 2017/02/22 Wenhe Ye
PATH=/bin:/sbin:/usr/bin:/usr/sbin:/usr/local/bin:/usr/local/sbin:~/bin
export PATH
request="$PWD/request.py"
compress="$PWD/starbucks_compress.py" 
# execute
python $request && python $compress && echo "Success!" || echo "Error!"
exit 0
