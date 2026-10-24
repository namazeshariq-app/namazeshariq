<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
  xmlns:html="http://www.w3.org/TR/REC-html40"
  xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
      <head>
        <title>XML Sitemap | Namaz-e-Shariq</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style type="text/css">
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            color: #1e293b;
            background-color: #f8fafc;
            margin: 0;
            padding: 30px 20px;
            line-height: 1.5;
          }
          .container {
            max-width: 1200px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 16px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
            border: 1px solid #e2e8f0;
            overflow: hidden;
          }
          .header {
            background: linear-gradient(135deg, #064e3b 0%, #022c22 100%);
            color: #ffffff;
            padding: 32px 36px;
          }
          .header h1 {
            margin: 0 0 8px 0;
            font-size: 26px;
            font-weight: 800;
            letter-spacing: -0.5px;
          }
          .header p {
            margin: 0;
            font-size: 14px;
            color: #a7f3d0;
            max-width: 800px;
          }
          .stats {
            display: flex;
            flex-wrap: wrap;
            gap: 16px;
            padding: 20px 36px;
            background: #f1f5f9;
            border-bottom: 1px solid #e2e8f0;
          }
          .stat-badge {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: #ffffff;
            padding: 8px 16px;
            border-radius: 9999px;
            font-size: 13px;
            font-weight: 600;
            color: #0f172a;
            border: 1px solid #cbd5e1;
          }
          .stat-badge span.count {
            background: #047857;
            color: #ffffff;
            padding: 2px 8px;
            border-radius: 12px;
            font-size: 12px;
          }
          .table-wrapper {
            overflow-x: auto;
            padding: 20px 36px 36px 36px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            font-size: 13px;
          }
          th {
            background: #f8fafc;
            color: #475569;
            text-align: left;
            padding: 12px 14px;
            font-weight: 700;
            text-transform: uppercase;
            font-size: 11px;
            letter-spacing: 0.5px;
            border-bottom: 2px solid #e2e8f0;
          }
          td {
            padding: 12px 14px;
            border-bottom: 1px solid #f1f5f9;
            vertical-align: middle;
          }
          tr:hover td {
            background: #f8fafc;
          }
          a {
            color: #047857;
            text-decoration: none;
            font-weight: 600;
            word-break: break-all;
          }
          a:hover {
            text-decoration: underline;
            color: #065f46;
          }
          .badge {
            display: inline-block;
            padding: 2px 8px;
            border-radius: 6px;
            font-size: 11px;
            font-weight: 700;
            text-transform: uppercase;
          }
          .badge-freq {
            background: #e0f2fe;
            color: #0369a1;
          }
          .badge-priority {
            background: #dcfce7;
            color: #15803d;
          }
          .hreflang-list {
            display: flex;
            gap: 4px;
            flex-wrap: wrap;
          }
          .hreflang-tag {
            background: #f1f5f9;
            color: #475569;
            padding: 2px 6px;
            border-radius: 4px;
            font-size: 10px;
            font-weight: 600;
            border: 1px solid #e2e8f0;
          }
          .footer {
            padding: 16px 36px;
            background: #f8fafc;
            border-top: 1px solid #e2e8f0;
            font-size: 12px;
            color: #64748b;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Namaz-e-Shariq &bull; XML Sitemap</h1>
            <p>
              This is the official search engine index for Namaz-e-Shariq (https://namaz-e-shariq.com). It informs Google, Bing, Yandex, and other search engines of accessible URLs and localized Hreflang alternates.
            </p>
          </div>

          <div class="stats">
            <div class="stat-badge">
              Total Indexed URLs: <span class="count"><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></span>
            </div>
            <div class="stat-badge">
              Standard: <span>Sitemaps Protocol 0.9</span>
            </div>
            <div class="stat-badge">
              Languages: <span>EN, UR, AR, HI, BN (x-default)</span>
            </div>
          </div>

          <div class="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th style="width: 45%;">URL / Location</th>
                  <th style="width: 15%;">Last Modified</th>
                  <th style="width: 10%;">Change Frequency</th>
                  <th style="width: 10%;">Priority</th>
                  <th style="width: 20%;">Hreflang Alternates</th>
                </tr>
              </thead>
              <tbody>
                <xsl:for-each select="sitemap:urlset/sitemap:url">
                  <tr>
                    <td>
                      <xsl:variable name="itemURL">
                        <xsl:value-of select="sitemap:loc"/>
                      </xsl:variable>
                      <a href="{$itemURL}" target="_blank">
                        <xsl:value-of select="sitemap:loc"/>
                      </a>
                    </td>
                    <td>
                      <xsl:value-of select="sitemap:lastmod"/>
                    </td>
                    <td>
                      <span class="badge badge-freq">
                        <xsl:value-of select="sitemap:changefreq"/>
                      </span>
                    </td>
                    <td>
                      <span class="badge badge-priority">
                        <xsl:value-of select="sitemap:priority"/>
                      </span>
                    </td>
                    <td>
                      <div class="hreflang-list">
                        <xsl:for-each select="xhtml:link">
                          <span class="hreflang-tag" title="{@href}">
                            <xsl:value-of select="@hreflang"/>
                          </span>
                        </xsl:for-each>
                      </div>
                    </td>
                  </tr>
                </xsl:for-each>
              </tbody>
            </table>
          </div>

          <div class="footer">
            <span>&copy; Namaz-e-Shariq Editorial Board. All rights reserved.</span>
            <span>Formatted via sitemap.xsl</span>
          </div>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
