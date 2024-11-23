import cv2
import numpy as np


def draw_yolo_predictions(image_path, label_path, class_names, output_path):
    # 이미지 불러오기
    image = cv2.imread(image_path)
    if image is None:
        raise FileNotFoundError(f"Image not found at {image_path}")

    # 클래스별 색상을 노란색으로 설정
    num_classes = len(class_names)
    color = (0, 255, 255)  # BGR 형식으로 노란색

    # 레이블 파일 읽기
    with open(label_path, 'r') as f:
        lines = f.readlines()

    for line in lines:
        parts = line.strip().split()
        class_id = int(parts[0])
        bbox = list(map(float, parts[1:]))
        x_center, y_center, width, height = bbox

        # YOLO 형식을 OpenCV 형식으로 변환
        h, w = image.shape[:2]
        x1 = int((x_center - width / 2) * w)
        y1 = int((y_center - height / 2) * h)
        x2 = int((x_center + width / 2) * w)
        y2 = int((y_center + height / 2) * h)

        # 사각형 그리기
        cv2.rectangle(image, (x1, y1), (x2, y2), color, 2)
        cv2.putText(image, f"{class_names[class_id]}", (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, color, 2)

    # 결과 저장
    cv2.imwrite(output_path, image)
    print(f"Output saved to {output_path}")


# 테스트
image_path = "2024-10-02_01-10-08_299946.jpg"
label_path = "2024-10-02_01-10-08_299946.txt"
class_names = ["helmet"]  # 클래스 이름
output_path = "output_image.jpg"

draw_yolo_predictions(image_path, label_path, class_names, output_path)
