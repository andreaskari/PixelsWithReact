import json
from flask import Flask
from flask_cors import CORS, cross_origin
from PIL import Image
import os
from os.path import isfile, join

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return '''
    <h1>API</h1>
    <ul>
        <li>
            /
                - Home & current location.
        </li>
        <li>
            /getGroupsAndImages/
                - Returns a dictionary of groups of images as keys and their actual images and the key-value.
        </li>
        <li>
            /getFromGroupAndImage/(group)/(image)/
            - Returns the image pixel data that corresponds to the group and image name passed in.
        </li>
    </ul>
    '''

@app.route("/getGroupsAndImages/")
def get_groups_and_images():
    path = 'imgs/Packages/'
    group_list = {}
    print(os.listdir(path))
    for group in os.listdir(path):
        if (group[0] != '.'):
            img_list = [img for img in os.listdir(path + group + "/") if img[0] != '.']
            group_list[group] = img_list
    return json.dumps(group_list)


@app.route('/getFromGroupAndImage/<group>/<image>/')
def get_pixel_grid(group, image):
    img = Image.open('imgs/Packages/' + group + "/" + image, 'r')
    pixel_list = list(img.getdata())
    width, height = img.size
    pixel_matrix = []
    for y in range(height):
        pixel_matrix.append(pixel_list[y * width : (y+1) * width])
    print("height {} should be {}".format(height, len(pixel_matrix)))
    print("width {} should be {}".format(width, len(pixel_matrix[0])))
    # print(pixel_matrix)

    pixels_dict = {"width": width, "height": height, "matrix": pixel_matrix}
    return json.dumps(pixels_dict)

if __name__ == "__main__":
    app.run()