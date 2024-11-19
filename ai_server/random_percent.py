import random

# Define the ranges and their probabilities
ranges = {
    (0, 20): 50,
    (21, 40): 15,
    (41, 60): 15,
    (61, 80): 10,
    (81, 100): 10
}

# Generate 181 random integers based on the distribution
random_integers = []
for value_range, percentage in ranges.items():
    count = (181 * percentage) // 100  # Calculate the number of integers for this range
    random_integers.extend(random.randint(value_range[0], value_range[1]) for _ in range(count))

# Shuffle the integers
random.shuffle(random_integers)

# Adjust to ensure exactly 181 integers (in case of rounding issues)
random_integers = random_integers[:181]

print(random_integers)
