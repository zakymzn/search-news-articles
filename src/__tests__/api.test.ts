import { describe, it, expect } from "vitest";
import api from "../services/api";
import AxiosMockAdapter from "axios-mock-adapter";

describe('API - Functional Test', () => {
  it('fetches articles successfully', async () => {
    const mock = new AxiosMockAdapter(api)

    const mockResponse = {
      "status": "OK",
      "copyright": "Copyright (c) 2025 The New York Times Company. All Rights Reserved.",
      "response": {
        "docs": [
          {
            "abstract": "The industry's courtship of Donald J. Trump resulted in one of the great lobbying free-for-alls in recent Washington history.",
            "byline": {
              "original": "By David Yaffe-Bellany and Kenneth P. Vogel"
            },
            "document_type": "article",
            "headline": {
              "main": "The 'Trump Pump': How Crypto Lobbying Won Over a President",
              "kicker": "",
              "print_headline": "Crypto Perfects Art of the Spiel To Sway Trump"
            },
            "_id": "nyt://article/308f0c56-5f74-5216-97b2-1ca1dd57338a",
            "keywords": [
              {
                "name": "Person",
                "value": "Trump, Donald J",
                "rank": 1
              }
            ],
            "multimedia": {
              "caption": "",
              "credit": "Valerie Chiang",
              "default": {
                "url": "https://static01.nyt.com/images/2025/07/13/us/politics/DC-CRYPTO-LOBBYING-SUB/DC-CRYPT0-LOBBYING-SUB-articleLarge.jpg",
                "height": 600,
                "width": 600
              },
              "thumbnail": {
                "url": "https://static01.nyt.com/images/2025/07/13/us/politics/DC-CRYPTO-LOBBYING-SUB/DC-CRYPT0-LOBBYING-SUB-thumbStandard.jpg",
                "height": 75,
                "width": 75
              }
            },
            "news_desk": "Washington",
            "print_page": "1",
            "print_section": "A",
            "pub_date": "2025-07-09T09:00:26Z",
            "section_name": "U.S.",
            "snippet": "The industry's courtship of Donald J. Trump resulted in one of the great lobbying free-for-alls in recent Washington history.",
            "source": "The New York Times",
            "subsection_name": "Politics",
            "type_of_material": "News",
            "uri": "nyt://article/308f0c56-5f74-5216-97b2-1ca1dd57338a",
            "web_url": "https://www.nytimes.com/2025/07/09/us/politics/trump-crypto-lobbying.html",
            "word_count": 3069
          }
        ],
        "metadata": {
          "hits": 3497,
          "offset": 0,
          "time": 133
        }
      }
    }

    mock.onGet('/articlesearch.json?q=test').reply(200, mockResponse)

    const res = await api.get('/articlesearch.json?q=test')
    expect(res.status).toBe(200)
    expect(res.data.status).toBe('OK')
    expect(res.data.response.docs.length).toBeGreaterThan(0)
    expect(res.data.response.docs[0].headline.main).toBe('The \'Trump Pump\': How Crypto Lobbying Won Over a President')
    expect(res.data.response.docs[0].web_url).toBe('https://www.nytimes.com/2025/07/09/us/politics/trump-crypto-lobbying.html')

    mock.restore()
  })

  it('handles API errors gracefully', async () => {
    const mock = new AxiosMockAdapter(api)
    mock.onGet('/articlesearch.json?q=fail').reply(500)

    try {
      await api.get('/articlesearch.json?q=fail')
    } catch (error: any) {
      expect(error.response.status).toBe(500)
    }

    mock.restore()
  })
})