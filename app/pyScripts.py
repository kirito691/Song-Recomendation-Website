from fer import FER
import matplotlib.pyplot as plt 
from imageio import imread, imwrite
import numpy as np
from PIL import Image as im
import scipy.misc


def create_image(x):
    w = len(x[0])
    h = len(x)
    img = np.arange(w*h*3).reshape(h,w,3)
    for i in range(h):
        for j in range(w):
            img[i][j][0] = x[i][j]["0"]
            img[i][j][1] = x[i][j]["1"]
            img[i][j][2] = x[i][j]["2"]
    return img


def detect_emotion(data):
    imwrite('output.jpg', data)
    img = plt.imread("output.jpg")
    detector = FER(mtcnn=True)
    print(detector.detect_emotions(img))
    plt.imshow(img)