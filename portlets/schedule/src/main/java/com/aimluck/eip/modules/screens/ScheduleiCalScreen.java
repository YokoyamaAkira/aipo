/*
 * Aipo is a groupware program developed by Aimluck,Inc.
 * Copyright (C) 2004-2012 Aimluck,Inc.
 * http://www.aipo.com
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

package com.aimluck.eip.modules.screens;

import java.util.Arrays;
import java.util.Calendar;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletOutputStream;

import net.fortuna.ical4j.model.Date;
import net.fortuna.ical4j.model.DateList;
import net.fortuna.ical4j.model.DateTime;
import net.fortuna.ical4j.model.Recur;
import net.fortuna.ical4j.model.TimeZone;
import net.fortuna.ical4j.model.TimeZoneRegistry;
import net.fortuna.ical4j.model.TimeZoneRegistryFactory;
import net.fortuna.ical4j.model.WeekDay;
import net.fortuna.ical4j.model.component.VEvent;
import net.fortuna.ical4j.model.component.VTimeZone;
import net.fortuna.ical4j.model.property.CalScale;
import net.fortuna.ical4j.model.property.Description;
import net.fortuna.ical4j.model.property.ExDate;
import net.fortuna.ical4j.model.property.Location;
import net.fortuna.ical4j.model.property.Method;
import net.fortuna.ical4j.model.property.ProdId;
import net.fortuna.ical4j.model.property.RRule;
import net.fortuna.ical4j.model.property.Version;
import net.fortuna.ical4j.model.property.XProperty;
import net.fortuna.ical4j.util.UidGenerator;

import org.apache.jetspeed.services.logging.JetspeedLogFactoryService;
import org.apache.jetspeed.services.logging.JetspeedLogger;
import org.apache.turbine.modules.screens.RawScreen;
import org.apache.turbine.util.RunData;
import org.apache.velocity.VelocityContext;
import org.apache.velocity.context.Context;

import com.aimluck.eip.common.ALEipConstants;
import com.aimluck.eip.common.ALEipUser;
import com.aimluck.eip.modules.actions.common.ALAction;
import com.aimluck.eip.schedule.ScheduleSearchResultData;
import com.aimluck.eip.schedule.ScheduleiCalSelectData;
import com.aimluck.eip.util.ALEipUtils;

/**
 *
 */
public class ScheduleiCalScreen extends RawScreen implements ALAction {

  /** logger */
  private static final JetspeedLogger logger = JetspeedLogFactoryService
    .getLogger(ScheduleiCalScreen.class.getName());

  /**
   * @param rundata
   * @throws Exception
   */
  @SuppressWarnings("unchecked")
  @Override
  protected void doOutput(RunData rundata) throws Exception {

    ScheduleiCalSelectData selectData = new ScheduleiCalSelectData();
    selectData.initField();

    ALEipUser user = ALEipUtils.getALEipUser(rundata);

    VelocityContext context = new VelocityContext();
    ALEipUtils.setupContext(rundata, context);

    // 前後3ヶ月の予定を取得
    Calendar date = Calendar.getInstance();
    date.add(Calendar.MONTH, -3);
    date.set(Calendar.HOUR_OF_DAY, 0);
    date.set(Calendar.MINUTE, 0);
    date.set(Calendar.SECOND, 0);
    date.set(Calendar.MILLISECOND, 0);
    java.util.Date startDate = date.getTime();
    date.add(Calendar.MONTH, 6);
    java.util.Date endDate = date.getTime();

    selectData.doViewList(this, rundata, context);

    List<Object> resultList = selectData.getList();
    Map<Integer, List<ScheduleSearchResultData>> dummyMaps =
      selectData.getDummyMaps();

    net.fortuna.ical4j.model.Calendar cal =
      new net.fortuna.ical4j.model.Calendar();
    cal.getProperties().add(new ProdId("-//Aimluck,Inc. //Aipo //JP"));
    cal.getProperties().add(Version.VERSION_2_0);
    cal.getProperties().add(CalScale.GREGORIAN);
    cal.getProperties().add(Method.PUBLISH);
    cal.getProperties().add(
      new XProperty("X-WR-CALNAME", user.getAliasName().getValue()));

    TimeZoneRegistry registry =
      TimeZoneRegistryFactory.getInstance().createRegistry();
    TimeZone timezone = registry.getTimeZone("Asia/Tokyo");
    VTimeZone tz = timezone.getVTimeZone();

    cal.getComponents().add(tz);

    for (Object result : resultList) {
      ScheduleSearchResultData rd = (ScheduleSearchResultData) result;

      java.util.Calendar cStart = Calendar.getInstance();
      cStart.setTime(rd.getStartDate().getValue());
      java.util.Calendar cEnd = Calendar.getInstance();
      cEnd.setTime(rd.getEndDate().getValue());

      Date dStart = null;
      Date dEnd = null;

      if ("S".equals(rd.getPattern())) {
        cStart.add(Calendar.DATE, 1);
        dStart = new Date(cStart.getTime());
        cEnd.add(Calendar.DATE, 2);
        dEnd = new Date(cEnd.getTime());
      } else {
        dStart = new DateTime(cStart.getTime());
        dEnd = new DateTime(cEnd.getTime());
      }

      String ptn = rd.getPattern();
      java.util.Date currentStartDate = getRepeatStartDate(startDate, ptn);

      Recur recur = null;
      int count = 0;
      // 毎日
      if (ptn.charAt(0) == 'D') {
        recur = new Recur(Recur.DAILY, null);
        count = 1;
        // 毎週
      } else if (ptn.charAt(0) == 'W') {
        recur = new Recur(Recur.WEEKLY, null);
        if (ptn.charAt(1) != '0') {
          recur.getDayList().add(WeekDay.SU);
        }
        if (ptn.charAt(2) != '0') {
          recur.getDayList().add(WeekDay.MO);
        }
        if (ptn.charAt(3) != '0') {
          recur.getDayList().add(WeekDay.TU);
        }
        if (ptn.charAt(4) != '0') {
          recur.getDayList().add(WeekDay.WE);
        }
        if (ptn.charAt(5) != '0') {
          recur.getDayList().add(WeekDay.TH);
        }
        if (ptn.charAt(6) != '0') {
          recur.getDayList().add(WeekDay.FR);
        }
        if (ptn.charAt(7) != '0') {
          recur.getDayList().add(WeekDay.SA);
        }
        count = 8;
      } else if (ptn.charAt(0) == 'M') {
        recur = new Recur(Recur.MONTHLY, null);
        int mday = Integer.parseInt(ptn.substring(1, 3));
        recur.getMonthList().addAll(
          Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12));
        recur.getMonthDayList().add(mday);
        count = 3;
      }
      if (count > 0) {
        if (ptn.charAt(count) == 'L') {
          recur.setUntil(new DateTime(cEnd.getTime()));
          cEnd.set(Calendar.YEAR, cStart.get(Calendar.YEAR));
          cEnd.set(Calendar.MONTH, cStart.get(Calendar.MONTH));
          cEnd.set(Calendar.DATE, cStart.get(Calendar.DATE));
          dEnd = new DateTime(cEnd.getTime());
        } else {
          recur.setUntil(new DateTime(endDate.getTime()));
          int hour = cStart.get(Calendar.HOUR_OF_DAY);
          int min = cStart.get(Calendar.MINUTE);
          cStart.setTime(currentStartDate);
          cStart.set(Calendar.HOUR_OF_DAY, hour);
          cStart.set(Calendar.MINUTE, min);
          dStart = new DateTime(cStart.getTime());
          hour = cEnd.get(Calendar.HOUR_OF_DAY);
          min = cEnd.get(Calendar.MINUTE);
          cEnd.setTime(currentStartDate);
          cEnd.set(Calendar.HOUR_OF_DAY, hour);
          cEnd.set(Calendar.MINUTE, min);
          dEnd = new DateTime(cEnd.getTime());
        }
      }

      VEvent event = new VEvent(dStart, dEnd, rd.getName().getValue());

      String place = rd.getPlace().getValue();
      if (place != null && place.length() > 0) {
        event.getProperties().add(new Location(place));
      }

      String description = rd.getDescription().getValue();
      if (description != null && description.length() > 0) {
        event.getProperties().add(new Description(description));
      }

      event.getProperties().add(
        new UidGenerator(rd.getScheduleId().getValueAsString()).generateUid());

      if (recur != null) {
        event.getProperties().add(new RRule(recur));
        if (dummyMaps.containsKey((int) rd.getScheduleId().getValue())) {
          List<ScheduleSearchResultData> list =
            dummyMaps.get((int) rd.getScheduleId().getValue());
          DateList dateList = new DateList();
          for (ScheduleSearchResultData dummy : list) {
            java.util.Calendar dummyStart = Calendar.getInstance();
            dummyStart.setTime(dummy.getStartDate().getValue());
            dummyStart.set(Calendar.HOUR_OF_DAY, cStart
              .get((Calendar.HOUR_OF_DAY)));
            dummyStart.set(Calendar.MINUTE, cStart.get((Calendar.MINUTE)));
            dateList.add(new DateTime(dummyStart.getTime()));
          }
          event.getProperties().add(new ExDate(dateList));

        }
      }

      cal.getComponents().add(event);
    }

    ServletOutputStream out = null;
    try {

      out = rundata.getResponse().getOutputStream();
      out.write(cal.toString().getBytes(ALEipConstants.DEF_CONTENT_ENCODING));

    } catch (Throwable t) {
      logger.error("[ScheduleiCalScreen]", t);
    } finally {
      if (out != null) {
        try {
          out.flush();
          out.close();
        } catch (Throwable ignore) {

        }
      }
    }
  }

  private java.util.Date getRepeatStartDate(java.util.Date startDate, String ptn) {
    Calendar cal = Calendar.getInstance();
    cal.setTime(startDate);

    if (isView(cal.getTime(), ptn)) {
      return startDate;
    } else {
      cal.add(Calendar.DATE, 1);
      return getRepeatStartDate(cal.getTime(), ptn);
    }
  }

  private boolean isView(java.util.Date date, String ptn) {
    boolean result = false;
    Calendar cal = Calendar.getInstance();
    cal.setTime(date);
    // 毎日
    if (ptn.charAt(0) == 'D') {
      result = true;
      // 毎週
    } else if (ptn.charAt(0) == 'W') {

      int dow = cal.get(Calendar.DAY_OF_WEEK);
      switch (dow) {
      // 日
        case Calendar.SUNDAY:
          result = ptn.charAt(1) != '0';
          break;
        // 月
        case Calendar.MONDAY:
          result = ptn.charAt(2) != '0';
          break;
        // 火
        case Calendar.TUESDAY:
          result = ptn.charAt(3) != '0';
          break;
        // 水
        case Calendar.WEDNESDAY:
          result = ptn.charAt(4) != '0';
          break;
        // 木
        case Calendar.THURSDAY:
          result = ptn.charAt(5) != '0';
          break;
        // 金
        case Calendar.FRIDAY:
          result = ptn.charAt(6) != '0';
          break;
        // 土
        case Calendar.SATURDAY:
          result = ptn.charAt(7) != '0';
          break;
        default:
          result = false;
          break;
      }
      // 毎月
    } else if (ptn.charAt(0) == 'M') {
      int mday = Integer.parseInt(ptn.substring(1, 3));
      result = cal.get(Calendar.DATE) == mday;
    } else {
      return true;
    }

    return result;
  }

  /**
   * @param rundata
   * @return
   */
  @Override
  protected String getContentType(RunData rundata) {
    return "text/calendar";
  }

  /**
   * @param obj
   */
  @Override
  public void setResultData(Object obj) {
  }

  /**
   * @param obj
   */
  @Override
  public void addResultData(Object obj) {
  }

  /**
   * @param objList
   */
  @Override
  public void setResultDataList(List<Object> objList) {
  }

  /**
   * @param msg
   */
  @Override
  public void addErrorMessage(String msg) {
  }

  /**
   * @param msgs
   */
  @Override
  public void addErrorMessages(List<String> msgs) {
  }

  /**
   * @param msgs
   */
  @Override
  public void setErrorMessages(List<String> msgs) {
  }

  /**
   * @param mode
   */
  @Override
  public void setMode(String mode) {
  }

  /**
   * @return
   */
  @Override
  public String getMode() {
    return null;
  }

  /**
   * @param rundata
   * @param context
   */
  @Override
  public void putData(RunData rundata, Context context) {
  }

}
