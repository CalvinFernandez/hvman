require 'open-uri'
require('cgi')
require('json')
require('time')

ENDPOINT = 'http://en.wikipedia.org/w/api.php'

parameters = %w[
  action=query
  list=allpages
  format=json
  apnamespace=0
  aplimit=500
  apdir=ascending
  ]

start = DateTime.now
# open file to hold migration data
File.open('article_title_migration.txt', 'w') do |f|

  # Pull wikipedia article titles in batches.
  # The continue parameter is set by each batch in order to correctly retrieve
  # the next batch
  continue = ''
  base_url = ENDPOINT + "?" + parameters.join("&")
  begin
    # Add the continue parameter to the query
    query = base_url + "&apcontinue=#{CGI.escape(continue)}"
    # Retrieve and parse the information for this batch
    begin
      result = JSON.parse(open(query).read)
    rescue
      p "Failed to open query!"
      p query
      break
    end
    # Save the continue value for the next query if one exists
    if result['query-continue'] then
      continue = result['query-continue']['allpages']['apcontinue']
    else
      continue = ''
    end

    # Process the info for each article
    articles = result['query']['allpages']
    articles.each { |article|
      id = article['pageid']
      url = "http://en.wikipedia.org/wiki?curid=#{id}"
      title = article['title']

      # Write this article's info into the migration file
      f.puts("Article.create(:title => '#{title}', :url => '#{url}')")
    }
  end while (!continue.empty?)

end

elapsed = DateTime.now.to_time - start.to_time
puts "Done! Elapsed time is #{elapsed} seconds"







