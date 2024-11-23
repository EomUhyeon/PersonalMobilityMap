import cv2
import os

def parse_yolo_labels(label_path):
    """
    YOLO 라벨 파일을 읽어 리스트로 변환하는 함수.

    Parameters:
    - label_path: YOLO 라벨 파일 경로

    Returns:
    - List of labels: [class_id, x_center, y_center, width, height, confidence]
    """
    labels = []
    with open(label_path, 'r') as f:
        for line in f:
            parts = line.strip().split()
            if len(parts) < 5:
                continue  # YOLO 라벨 형식이 아니면 스킵
            class_id, x_center, y_center, width, height = map(float, parts[:5])
            confidence = float(parts[5]) if len(parts) == 6 else 1.0  # confidence가 없으면 1.0으로 기본값 설정
            labels.append([int(class_id), x_center, y_center, width, height, confidence])
    return labels

def draw_yolo_predictions(image_path, label_path, class_names, output_path):
    """
    이미지에 YOLO 형식의 경계 상자를 그리는 함수.

    Parameters:
    - image_path: 이미지 파일 경로
    - label_path: YOLO 라벨 파일 경로
    - class_names: 클래스 이름 리스트
    - output_path: 저장할 출력 이미지 경로
    """
    # 이미지 불러오기
    image = cv2.imread(image_path)
    if image is None:
        raise FileNotFoundError(f"Image not found at {image_path}")

    # YOLO 라벨 읽기
    labels = parse_yolo_labels(label_path)

    # 이미지 크기
    img_h, img_w = image.shape[:2]

    # YOLO 라벨 파싱 및 경계 상자 그리기
    for label in labels:
        class_id, x_center, y_center, width, height, confidence = label

        # YOLO 좌표 변환
        x1 = int((x_center - width / 2) * img_w)
        y1 = int((y_center - height / 2) * img_h)
        x2 = int((x_center + width / 2) * img_w)
        y2 = int((y_center + height / 2) * img_h)

        # 클래스 색상 (노란색)
        color = (0, 255, 255)

        # 경계 상자 그리기
        cv2.rectangle(image, (x1, y1), (x2, y2), color, 2)

        # 텍스트 추가 (클래스 이름 및 정확도)
        label_text = f"{class_names[class_id]} {confidence:.2f}"
        cv2.putText(image, label_text, (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, color, 2)

    # 출력 이미지 저장
    cv2.imwrite(output_path, image)
    print(f"Output saved at {output_path}")

# 테스트
image_path = "2024-10-02_01-10-08_299946.jpg"  # 입력 이미지 경로
label_path = "2024-10-02_01-10-08_299946.txt"  # YOLO 라벨 파일 경로
output_path = "output_image001.jpg"  # 출력 이미지 경로

# 클래스 이름 (YOLO 모델에서 사용하는 클래스 목록)
class_names = ["person", "car", "bicycle"]

# 함수 호출
draw_yolo_predictions(image_path, label_path, class_names, output_path)
