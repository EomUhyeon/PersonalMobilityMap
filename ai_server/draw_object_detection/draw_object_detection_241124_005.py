import cv2

def draw_yolo_detections(image_path, label_path, class_names, output_path):
    """
    YOLO 라벨 데이터를 사용하여 YOLO 스타일로 결과를 그리는 함수.
    """

    # 이미지 읽기
    image = cv2.imread(image_path)
    if image is None:
        raise FileNotFoundError(f"이미지를 찾을 수 없습니다: {image_path}")

    img_h, img_w = image.shape[:2]

    # 라벨 파일 읽기
    with open(label_path, "r") as f:
        boxes = []
        for line in f.readlines():
            class_id, x_center, y_center, width, height = map(float, line.strip().split())
            class_id = int(class_id)
            x_center *= img_w
            y_center *= img_h
            width *= img_w
            height *= img_h
            x1 = int(x_center - width / 2)
            y1 = int(y_center - height / 2)
            x2 = int(x_center + width / 2)
            y2 = int(y_center + height / 2)
            boxes.append([x1, y1, x2, y2, class_id])

    # 박스와 라벨 그리기
    for box in boxes:
        x1, y1, x2, y2, class_id = box
        color = (0, 0, 255)
        class_name = class_names[class_id]

        # 바운딩 박스 그리기
        cv2.rectangle(image, (x1, y1), (x2, y2), color, 2)

        # 라벨 텍스트와 배경 그리기
        label = f"{class_name}"  # 클래스 이름 및 confidence
        text_size, _ = cv2.getTextSize(label, cv2.FONT_HERSHEY_SIMPLEX, 0.7, 1)
        text_w, text_h = text_size
        cv2.rectangle(image, (x1, y1 - text_h - 5), (x1 + text_w, y1), color, -1)  # 텍스트 배경
        cv2.putText(image, label, (x1, y1 - 3), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 255, 255), 1, cv2.LINE_AA)

    # 결과 이미지 저장
    cv2.imwrite(output_path, image)
    print(f"결과 이미지 저장: {output_path}")


# 사용 예제
image_path = "./images/2024-10-02_08-11-53_846616.jpg"
label_path = "./labels/2024-10-02_08-11-53_846616.txt"
class_names = ["center_line"]
output_path = "seobuyeog_ibgu_samgeoli/2024-10-02_08-11-53_846616.jpg"

draw_yolo_detections(image_path, label_path, class_names, output_path)
