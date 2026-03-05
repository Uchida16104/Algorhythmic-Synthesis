# ===== Additional timer program =====
# ===== Global control =====
set :start_time, vt
set :running, true

in_thread do
  while get(:running)
    if vt - get(:start_time) > 60 # < ===== 60 is Variables(Number). (ex 120, 156, 210, 273, 340, 360, 441, 500, 560, 600, etc... ===== >
      set :running, false
      puts "Performance stopped (5 minutes reached)"
    end
    sleep 1
  end
end
live_loop :voice_number do
  stop unless get(:running)
  # ===== Please incorporate the above code into your existing code =====
end
