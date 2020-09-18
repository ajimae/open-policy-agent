package httpapi.authz

# bob is alice's manager, and betty is charlie's.
# subordinates = {"alice": [], "charlie": [], "bob": ["alice"], "betty": ["charlie"]}
subordinates = {"chukwuemeka": [], "onyeka": [], "famous": ["chukwuemeka"], "seyi": ["onyeka"]}

# HTTP API request
import input

default allow = false

# Allow users to get their own salaries.
allow {
  some username
  input.method == "GET"
  input.path = ["user", username]
  input.user == username
}

# Allow managers to get their subordinates' salaries.
allow {
  some username
  input.method == "GET"
  input.path = ["user", username]
  subordinates[input.user][_] == username
}
