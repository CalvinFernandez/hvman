SOURCE = ARGV[0]
DESTINATION = ARGV[1]
TYPE = ARGV[2]
RANGE = ARGV[3]

if !SOURCE || !DESTINATION || !TYPE
  puts "Usage: data_sanitizer.rb sourcefile dstfile type"
  exit
end

sourcefile = File.open(DESTINATION, 'w')

def isalpha(str)
  !str.match(/[^A-Za-z]/)
end

if TYPE == 'alpha'
  File.readlines(SOURCE).each do |line|
    line = line.strip
    if isalpha(line)
      if line[0] == 'h' || line[0] == 'H'
        sourcefile.write(line + "\n");
      end
    end
  end
end
