import pandas as pd
import matplotlib.pyplot as plt

# Load the Excel sheet
df = pd.read_excel("roulette_sheet.xlsx")

# Display the first few rows
# print(df.head())

# Frequency of red and black numbers

# Red and black number mapping
red_numbers = {1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36}
black_numbers = {2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35}

# Create a new column to mark whether a number is red or black
df["color"] = df["win"].apply(
    lambda x: "red" if x in red_numbers else "black" if x in black_numbers else "green"
)

# Frequency of red and black numbers
color_counts = df["color"].value_counts()
print(color_counts)

# Most and least frequent red and black numbers
red_counts = df[df["color"] == "red"]["win"].value_counts()
black_counts = df[df["color"] == "black"]["win"].value_counts()

most_frequent_red = red_counts.idxmax()
least_frequent_red = red_counts.idxmin()

most_frequent_black = black_counts.idxmax()
least_frequent_black = black_counts.idxmin()

print(f"Most Frequent Red: {most_frequent_red}")
print(f"Least Frequent Red: {least_frequent_red}")
print(f"Most Frequent Black: {most_frequent_black}")
print(f"Least Frequent Black: {least_frequent_black}")


# Streaks

# Shift the color column to identify streaks
df["prevColor"] = df["color"].shift(1)
df["streak"] = (df["color"] != df["prevColor"]).cumsum()

# Calculate streak lengths
streaks = df.groupby("streak")["color"].agg(["size", "first"])
red_streaks = streaks[streaks["first"] == "red"]
black_streaks = streaks[streaks["first"] == "black"]

# Longest streaks
longest_red_streak = red_streaks["size"].max()
longest_black_streak = black_streaks["size"].max()

# Streaks of 3 or more
red_streaks_3_plus = red_streaks[red_streaks["size"] >= 3].shape[0]
black_streaks_3_plus = black_streaks[black_streaks["size"] >= 3].shape[0]

print(f"Longest Red Streak: {longest_red_streak}")
print(f"Longest Black Streak: {longest_black_streak}")
print(f"Red Streaks (3 or more): {red_streaks_3_plus}")
print(f"Black Streaks (3 or more): {black_streaks_3_plus}")


# Find zigzag patterns
df["zigzag"] = df["color"] != df["prevColor"]
zigzag_streaks = df[df["zigzag"] == True]

# Count total zigzags and longest zigzag streak
total_zigzags = zigzag_streaks.shape[0]

zigzag_df = (df["color"] != df["prevColor"]).cumsum()
zigzag_streak_lengths = zigzag_df.value_counts()
longest_zigzag_streak = zigzag_streak_lengths.max()

print(f"Total Zigzags: {total_zigzags}")
print(f"Longest Zigzag Streak: {longest_zigzag_streak}")


# Time based streak analysis

# Step 1: Extract hour from Draw Time
df["hour"] = pd.to_datetime(df["draw"]).dt.hour

# Step 2: Merge hour information into streaks DataFrame
# Join the hour information with the streaks data by using the original index
df["streak"] = (df["color"] != df["color"].shift()).cumsum()
df_with_streaks = df.groupby("streak").agg(
    {"draw": "first", "color": "first", "hour": "first", "win": "size"}
)

# Step 3: Filter streaks of 4 or more
red_streaks_4_plus = df_with_streaks[
    (df_with_streaks["color"] == "red") & (df_with_streaks["win"] >= 4)
]
black_streaks_4_plus = df_with_streaks[
    (df_with_streaks["color"] == "black") & (df_with_streaks["win"] >= 4)
]

# Step 4: Count how often these streaks occurred at each hour
red_streaks_by_hour = red_streaks_4_plus["hour"].value_counts()
black_streaks_by_hour = black_streaks_4_plus["hour"].value_counts()

# Step 5: Output the results
print(f"Red streaks of 4 or more by hour: \n{red_streaks_by_hour}")
print(f"Black streaks of 4 or more by hour: \n{black_streaks_by_hour}")


# Red to black ratio
red_black_ratio = color_counts["red"] / color_counts["black"]
print(f"Red to Black Ratio: {red_black_ratio}")


# Probability of zigzag extending to 6 after 4
total_zigzags_of_4 = len(
    df[df["zigzag"].rolling(4).sum() == 4]
)  # Count how many times we saw a streak of 5
total_zigzags_extending_to_6 = len(
    df[df["zigzag"].rolling(6).sum() == 6]
)  # Count how many times it extended to 7

if total_zigzags_of_4 > 0:
    probability_of_extending = total_zigzags_extending_to_6 / total_zigzags_of_4
    print(
        f"Probability of a zigzag streak extending to 7 after hitting 4: {probability_of_extending:.2%}"
    )


# Pie chart for red vs black distribution
# color_counts.plot(
#     kind="pie", autopct="%1.1f%%", startangle=90, colors=["red", "black", "green"]
# )
# plt.title("Distribution of Red vs Black Numbers")
# plt.show()


# stratt

# Initialize starting balance
balance = 175000  # Starting with $1000
bet_amount = 10  # Betting $10 per round
df["next_play"] = "red"  # To store the next color bet
df["balance"] = balance  # To track balance after each round
df["bet_amount"] = bet_amount


# Function to check if the bet was won
def check_bet(result_color, bet_color):
    return result_color == bet_color


# Variable to track whether we're in a zero wait state
waiting_after_zero = False

# Loop through the DataFrame and apply the strategy
for i in range(1, len(df)):  # Start from the second round (index 1)
    previous_color = df["color"].iloc[i - 1]
    current_color = df["color"].iloc[i]

    # print(previous_color, current_color)

    # If zero was previously drawn, skip to next valid draw
    if waiting_after_zero:
        if current_color != "green":  # A valid color after zero
            df.loc[i, "next_play"] = current_color
            waiting_after_zero = False  # Reset waiting status

        # Record balance after this draw
        df.loc[i, "balance"] = balance
        df.loc[i, "bet_amount"] = bet_amount
        continue  # Skip balance update and proceed to next round

    # If zero is drawn, skip the next bet
    if current_color == "green":
        waiting_after_zero = True  # Set wait status after zero
        # Set the next play color based on the previous round's result
        df.loc[i, "next_play"] = "none"

        # Check if the bet was won in the current draw
        bet_won = check_bet(current_color, previous_color)

        # Update balance
        if bet_won:
            balance += bet_amount  # Win adds $10
            bet_amount = 10
        else:
            balance -= bet_amount  # Loss subtracts $10
            bet_amount = bet_amount * 2

        # Record balance after this draw
        df.loc[i, "balance"] = balance
        df.loc[i, "bet_amount"] = bet_amount

        continue

    # Set the next play color based on the previous round's result
    # df["next_play"].iloc[i] = previous_color
    df.loc[i, "next_play"] = current_color

    # Check if the bet was won in the current draw
    bet_won = check_bet(current_color, previous_color)

    # Update balance
    if bet_won:
        balance += bet_amount  # Win adds $10
        bet_amount = 10
    else:
        balance -= bet_amount  # Loss subtracts $10
        bet_amount = bet_amount * 2

    # Record balance after this draw
    df.loc[i, "balance"] = balance
    df.loc[i, "bet_amount"] = bet_amount

# # Output the resulting DataFrame with balance changes
print(df[["color", "next_play", "balance", "bet_amount"]])
df.to_csv("result.csv", columns=["color", "next_play", "balance", "bet_amount"])
