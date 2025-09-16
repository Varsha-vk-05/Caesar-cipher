import plotly.graph_objects as go
import pandas as pd

# Data provided in JSON format
data = {
    "English_Frequency": {"A": 8.12, "B": 1.29, "C": 2.78, "D": 4.25, "E": 12.02, "F": 2.23, "G": 2.02, "H": 6.09, "I": 6.97, "J": 0.15, "K": 0.77, "L": 4.03, "M": 2.41, "N": 6.75, "O": 7.68, "P": 1.93, "Q": 0.10, "R": 5.99, "S": 6.33, "T": 9.10, "U": 2.76, "V": 0.98, "W": 2.36, "X": 0.15, "Y": 1.97, "Z": 0.07},
    "Ciphertext_Frequency": {"A": 0.0, "B": 0.0, "C": 0.0, "D": 5.0, "E": 5.0, "F": 0.0, "G": 5.0, "H": 10.0, "I": 0.0, "J": 0.0, "K": 5.0, "L": 10.0, "M": 0.0, "N": 0.0, "O": 0.0, "P": 5.0, "Q": 0.0, "R": 0.0, "S": 5.0, "T": 5.0, "U": 5.0, "V": 20.0, "W": 10.0, "X": 0.0, "Y": 0.0, "Z": 0.0}
}

# Extract letters and frequencies
letters = list(data["English_Frequency"].keys())
english_freq = list(data["English_Frequency"].values())
cipher_freq = list(data["Ciphertext_Frequency"].values())

# Create the grouped bar chart
fig = go.Figure()

# Add English frequency bars
fig.add_trace(go.Bar(
    x=letters,
    y=english_freq,
    name='English',
    marker_color='#1FB8CD'
))

# Add Ciphertext frequency bars
fig.add_trace(go.Bar(
    x=letters,
    y=cipher_freq,
    name='Ciphertext',
    marker_color='#DB4545'
))

# Update traces
fig.update_traces(cliponaxis=False)

# Update layout
fig.update_layout(
    title='Frequency Analysis: English vs Caesar',
    xaxis_title='Letter',
    yaxis_title='Frequency %',
    barmode='group',
    legend=dict(orientation='h', yanchor='bottom', y=1.05, xanchor='center', x=0.5)
)

# Save the chart
fig.write_image('letter_frequency_comparison.png')