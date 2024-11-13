import pandas as pd
import matplotlib.pyplot as plt

# Load the Excel sheet
df = pd.read_excel("roulette_sheet.xlsx")

# Display the first few rows
# print(df.head())

# Frequency of red and black numbers

# win numbers
win_numbers = {
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28,
    29,
}

# Create a new column to mark whether a number is red or black
df["win_stat"] = df["win"].apply(lambda x: "win" if x in win_numbers else "lose")

# stratt

# Initialize starting balance
balance = 175000  # Starting with $1000
bet_amount = 10  # Betting $10 per round
df["streak"] = 1


# Function to check if the bet was won
def check_bet(result_color, bet_color):
    return result_color == bet_color


# Variable to track whether we're in a zero wait state
waiting_after_zero = False

# Loop through the DataFrame and apply the strategy
for i in range(1, len(df)):  # Start from the second round (index 1)
    current_status = df["win_stat"].iloc[i]

    print(df["win"].iloc[i], current_status)

    if current_status == "lose":
        df.loc[i, "streak"] = df["streak"].iloc[i - 1] + 1
    else:
        df.loc[i, "streak"] = 0
# # Output the resulting DataFrame with balance changes
print(df[["win", "win_stat", "streak"]])
print(df["streak"].max())
df.to_csv("result.csv", columns=["win", "win_stat", "streak"])
