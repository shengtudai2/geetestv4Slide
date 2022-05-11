import json
import time

import cv2
import numpy as np
import requests
import re
import uuid
import random
from tools import *

pos_track = []
def uuid():
    def __random(c):
        r = int(random.random() * 16)
        v = r if c == 'x' else (r & 0x3 | 0x8)
        return hex(v)[2:]
    string = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    ret = ''
    for i in string:
        if i in 'xy':
            i = __random(i)
        ret += i
    return ret

for i in range(100):
    s = requests.session()
    s.headers = {
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36"}

    def captchaId():
        url = "https://www.geetest.com/adaptive-captcha-demo"
        a = s.get(url).text
        pattern = re.compile(r'href="(.*)adaptive-captcha-demo\.js"')
        d = re.search(pattern, a)[0]
        next_url = "https://www.geetest.com" + d[6:-1]
        e = s.get(next_url).text
        pattern2 = re.compile(r'captchaId:"([0-9a-z]+)"')
        d = re.search(pattern2, e)[0]
        return d[11:-1]

    capId = captchaId()
    # print(captchaId())

    def load(captchaId):
        baseurl = "https://static.geetest.com/"
        url = "https://gcaptcha4.geetest.com/load"
        params = {
            "challenge":uuid(),
            "captcha_id": captchaId,
            "client_type": "web",
            "risk_type": "slide",
            "lang": "zh",
            "callback": "geetest_"+ str(int(time.time()*1000))}
        r = s.get(url=url, params=params).text
        jr = json.loads(r[22:-1])
        lot_number = jr["data"]["lot_number"]
        slice = baseurl +  jr["data"]["slice"]
        bg =baseurl +  jr["data"]["bg"]
        ypos = jr["data"]["ypos"]
        payload = jr["data"]["payload"]
        process_token = jr["data"]["process_token"]
        return lot_number,slice,bg,ypos,payload,process_token

    lot_number, slice,bg,ypos,payload,process_token = load(capId)


    def get_imgInfo(slice, bg):
        bigUrl = bg
        smallUrl = slice
        bg_img = cv2.imdecode(np.frombuffer(s.get(bigUrl).content, np.uint8), cv2.IMREAD_COLOR)
        tp_img = cv2.imdecode(np.frombuffer(s.get(smallUrl).content, np.uint8), cv2.IMREAD_COLOR)
        bg_edge = cv2.Canny(bg_img, 100, 200)
        tp_edge = cv2.Canny(tp_img, 100, 200)

        # 转换图片格式
        bg_pic = cv2.cvtColor(bg_edge, cv2.COLOR_GRAY2RGB)
        tp_pic = cv2.cvtColor(tp_edge, cv2.COLOR_GRAY2RGB)

        # 缺口匹配
        res = cv2.matchTemplate(bg_pic, tp_pic, cv2.TM_CCOEFF_NORMED)
        min_val, max_val, min_loc, max_loc = cv2.minMaxLoc(res)  # 寻找最优匹配

        # 绘制方框
        th, tw = tp_pic.shape[:2]
        tl = max_loc  # 左上角点的坐标
        br = (tl[0] + tw, tl[1] + th)  # 右下角点的坐标
        cv2.rectangle(bg_img, tl, br, (0, 0, 255), 2)  # 绘制矩形
        file = str(random.randint(1,10000)) + ".png"
        cv2.imwrite(file, bg_img)  # 保存在本地
        cx = max_loc[0]
        return max_loc[0]

    aa = s.get(bg).content
    fa = open("bg.png", "wb")
    fa.write(aa)
    fa.close()
    bb = s.get(slice).content
    fb = open("slice.png", "wb")
    fb.write(bb)
    fb.close()

    xpos = get_distance(bg="bg.png", tp="slice.png", im_show=False)
    track = []
    def verify():
        url = "https://gcaptcha4.geetest.com/verify"
        challenge = uuid()
        global track
        track = get_slide_track(xpos)
        params = {
            "captcha_id": capId,
            "challenge": challenge,
            "client_type": "web",
            "lot_number": lot_number,
            "risk_type": "slide",
            "pt": 1,
            "w": get_w(track, 300, lot_number),
            "callback": "geetest_"+str(int(time.time()*1000))
        }
        r = s.get(url=url, params=params)
        r = json.loads(r.text[22:-1])
        return r

    r = verify()
    try:
        if r["data"]["result"] == 'success':
            print("验证成功")
            f = open("track_record.txt", "a")
            record = str(xpos) + '----' + str(track) + '\n'
            f.write(record)
            f.close()
        else:
            print("验证失败")
            print(xpos)
    except Exception as e:
        print(e)
print(pos_track)


